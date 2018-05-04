const chokidar = require('chokidar');
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const {promisify} = require('util');

const REDUCER_LINKER_TEMPLATE = `
// THIS FILE IS GENERATED AUTOMATICALLY. ANY CHANGES WILL BE DISCARDED BY THE BUILD SYSTEM.

import {combineReducers} from 'redux';
%IMPORTS%

export default combineReducers({
  %LINKS%
});
`.replace(/^\s+/, '');
const LINKER_FILE_PATH = path.join('store', 'reducer.js');
const DEPENDENCIES_FILE_PATTERN = 'ui/organism/*/{state,reducer}.js';

function generateLinker(dependencies, template) {
  const organismReducers = new Map();
  for (const dependency of dependencies) {
    const pathParts = dependency.split(path.sep);
    const organism = pathParts[2];
    const dependencyType = pathParts[3].replace(/\.js$/i, '');
    if (!organismReducers.has(organism)) {
      organismReducers.set(organism, {
        state: null,
        reducer: null,
      });
    }
    organismReducers.get(organism)[dependencyType] = dependency;
  }

  const imports = [];
  const links = [];
  for (const organism of organismReducers.keys()) {
    const providedFiles = organismReducers.get(organism);
    if (!providedFiles.reducer || !providedFiles.state) {
      console.warn( // eslint-disable-line no-console
        `The ${organism} organism is missing ${providedFiles.state ? 'reducer' : 'state'}.js (but it does have the ` +
        `${providedFiles.state ? 'state' : 'reducer'}.js file), therefore it cannot be linked with other reducers.`,
      );
      continue;
    }

    imports.push(`import ${organism}Reducer from '~/ui/organism/${organism}/reducer';`);
    imports.push(`import {NAMESPACE as ${organism}Namespace} from '~/ui/organism/${organism}/state';`);
    links.push(`[${organism}Namespace]: ${organism}Reducer,`);
  }

  return template
    .replace('%IMPORTS%', imports.join('\n'))
    .replace('%LINKS%', links.join('\n  '));
}

function rebuildLinker(projectRoot, callback = null) {
  const globOptions =  {
    cwd: projectRoot,
  };
  if (callback) {
    glob(DEPENDENCIES_FILE_PATTERN, globOptions, processGlobResult);
  } else {
    const globResult = glob.sync(DEPENDENCIES_FILE_PATTERN, globOptions);
    processGlobResult(null, globResult);
  }

  function processGlobResult(error, dependencies) {
    if (error) {
      callback(error);
      return;
    }

    const linkerCode = generateLinker(dependencies, REDUCER_LINKER_TEMPLATE);
    if (callback) {
      fs.writeFile(path.join(projectRoot, LINKER_FILE_PATH), linkerCode, callback);
    } else {
      fs.writeFileSync(path.join(projectRoot, LINKER_FILE_PATH), linkerCode);
    }
  }
}

module.exports = (nextConfig = {}) => {
  const projectRoot = process.cwd();
  rebuildLinker(projectRoot); // run synchronously

  if (process.env.NODE_ENV === 'development') {
    const watcher = chokidar.watch(DEPENDENCIES_FILE_PATTERN);
    // Run the linking process asynchronously
    const callback = () => rebuildLinker(projectRoot, error => {
      if (error) {
        console.error('Failed to link sagas', error); // eslint-disable-line no-console
      }
    });
    watcher
      .on('add', callback)
      .on('change', callback)
      .on('unlink', callback);
  }

  return nextConfig;
};
