const chokidar = require('chokidar');
const fs = require('fs');
const glob = require('glob');
const upperFirst = require('lodash.upperfirst');
const path = require('path');

const DEPENDENCIES_FILE_PATTERN = 'ui/organism/*/{dispatchers,init,selectors,*UI}.js';

function generateLinker(organism, organismFiles) {
  const imports = [];
  if (organismFiles.dispatchers) {
    imports.push(`import dispatchers from '~/ui/organism/${organism}/dispatchers';`);
  }
  if (organismFiles.init) {
    imports.push(`import init from '~/ui/organism/${organism}/init';`);
  }
  imports.push(`import ${upperFirst(organism)}UI from '~/ui/organism/${organism}/${upperFirst(organism)}UI';`);
  if (organismFiles.selectors) {
    imports.push(`import selectors from '~/ui/organism/${organism}/selectors';`);
  }

  const connectors = [];
  if (organismFiles.selectors) {
    connectors.push('selectors,');
  }
  if (organismFiles.dispatchers) {
    connectors.push('dispatchers,');
  }

  return `
// THIS FILE IS GENERATED AUTOMATICALLY. ANY CHANGES WILL BE DISCARDED BY THE BUILD SYSTEM.

import {connect} from 'react-redux';
${imports.join('\n')}

const ${upperFirst(organism)} = connect(${connectors.length ? `\n  ${connectors.join('\n  ')}` : ''}
)(
  ${upperFirst(organism)}UI,
);

${organismFiles.init ?
    `${upperFirst(organism)}.init = init;\n\n`
    :
    ''
}export default ${upperFirst(organism)};
`.replace(/^\s+/, '');
}

function rebuildLinker(organism, organismFiles, callback) {
  const linker = generateLinker(organism, organismFiles);
  const linkerPath = `ui/organism/${organism}/${upperFirst(organism)}.js`;
  const gitIgnorePath = `ui/organism/${organism}/.gitignore`;
  if (callback) {
    fs.writeFile(linkerPath, linker, error => {
      if (error) {
        callback(error);
        return;
      }

      fs.readFile(gitIgnorePath, 'utf8', (readError, content) => {
        if (!readError && content.split(/\r?\n/).includes(`${upperFirst(organism)}.js`)) {
          callback();
          return;
        }

        const creatingNewFile = !!readError;
        const newContent = (
          (content || '') +
          (!content || `${content}`.endsWith('\n') ? '' : '\n') +
          (creatingNewFile ? '.gitignore\n' : '') +
          `${upperFirst(organism)}.js\n`
        );
        fs.writeFile(gitIgnorePath, newContent, 'utf8', callback);
      });
    });
  } else {
    fs.writeFileSync(linkerPath, linker);
    let gitIgnore = '';
    let creatingNewFile = false;
    try {
      gitIgnore = fs.readFileSync(gitIgnorePath, 'utf8');
      if (gitIgnore.split(/\r?\n/).includes(`${upperFirst(organism)}.js`)) {
        return;
      }
    } catch (readError) {
      creatingNewFile = true;
    }
    const newContent = (
      gitIgnore +
      (!gitIgnore || gitIgnore.endsWith('\n') ? '' : '\n') +
      (creatingNewFile ? '.gitignore\n' : '') +
      `${upperFirst(organism)}.js\n`
    );
    fs.writeFileSync(gitIgnorePath, newContent, 'utf8', callback);
  }
}

function rebuildLinkers(projectRoot, callback = null) {
  const globOptions = {
    cwd: projectRoot,
  };
  if (callback) {
    glob(DEPENDENCIES_FILE_PATTERN, globOptions, (error, dependencies) => {
      if (error) {
        callback(error);
      } else {
        handleGlobResult(dependencies);
      }
    });
  } else {
    const dependencies = glob.sync(DEPENDENCIES_FILE_PATTERN, globOptions);
    handleGlobResult(dependencies);
  }

  function handleGlobResult(dependencies) {
    const organisms = groupDependenciesByOrganism(dependencies);
    const taskDoneFlags = [];
    if (callback) {
      let lastIndex = -1;
      for (const organism of organisms.keys()) {
        if (!organisms.get(organism).ui) {
          continue;
        }

        const index = ++lastIndex;
        taskDoneFlags[index] = false;
        rebuildLinker(organism, organisms.get(organism), error => onLinkerDone(index, error));
      }
    } else {
      for (const organism of organisms.keys()) {
        if (!organisms.get(organism).ui) {
          continue;
        }

        rebuildLinker(organism, organisms.get(organism));
      }
    }

    function onLinkerDone(taskIndex, error) {
      if (error) {
        callback(error);
        return;
      }

      if (taskDoneFlags.every(_ => _)) {
        callback();
      }
    }
  }

  function groupDependenciesByOrganism(dependencies) {
    const organisms = new Map();
    for (const dependency of dependencies) {
      const pathParts = dependency.split(path.sep);
      const organism = pathParts[2];
      if (!organisms.has(organism)) {
        organisms.set(organism, {
          dispatchers: null,
          init: null,
          selectors: null,
          ui: null,
        });
      }
      const type = pathParts[3].endsWith('UI.js') ? 'ui' : pathParts[3].replace(/\.js/i, '');
      organisms.get(organism)[type] = dependency;
    }
    return organisms;
  }
}

module.exports = (nextConfig = {}) => {
  const projectRoot = process.cwd();
  rebuildLinkers(projectRoot); // run synchronously

  if (process.env.NODE_ENV === 'development') {
    const watcher = chokidar.watch(DEPENDENCIES_FILE_PATTERN);
    // Run the linking process asynchronously
    const callback = () => rebuildLinkers(projectRoot, error => {
      if (error) {
        console.error('Failed to link organisms', error); // eslint-disable-line no-console
      }
    });
    watcher
      .on('add', callback)
      .on('change', callback)
      .on('unlink', callback);
  }

  return nextConfig;
};
