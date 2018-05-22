const chokidar = require('chokidar');
const fs = require('fs');
const glob = require('glob');
const path = require('path');

const LINKER_FILE_PATH = path.join('store', 'sagas.js');
const SAGAS_LINKER_TEMPLATE = `
// THIS FILE IS GENERATED AUTOMATICALLY. ANY CHANGES WILL BE DISCARDED BY THE BUILD SYSTEM.

import {fork} from 'redux-saga/effects';
%SAGA_IMPORTS%

const SAGAS = [
  %SAGA_LIST%
];

export default function *rootSaga() {
  for (const organismSaga of SAGAS) {
    yield fork(organismSaga);
  }
}
`.replace(/^\s+/, '');
const SAGA_FILE_PATTERN = 'ui/organism/*/saga.js';

function generateLinker(sagas, template) {
  const importPaths = sagas.map(sagaPath => `~/${sagaPath.replace(/\.js$/i, '')}`);
  const identifiers = importPaths.map(importPath => `${importPath.match(/\/([^/]+)\/([^/]+)$/)[1]}Saga`);
  const imports = importPaths.map((importPath, index) => `import ${identifiers[index]} from '${importPath}';`);

  return template
    .replace('%SAGA_IMPORTS%', imports.join('\n'))
    .replace('%SAGA_LIST%', `${identifiers.join(',\n  ')}${identifiers.length ? ',' : ''}`);
}

function rebuildLinker(projectRoot, callback = null) {
  const globOptions = {
    cwd: projectRoot,
  };
  if (callback) {
    glob(SAGA_FILE_PATTERN, globOptions, processGlobResult);
  } else {
    const globResult = glob.sync(SAGA_FILE_PATTERN, globOptions);
    processGlobResult(null, globResult);
  }

  function processGlobResult(error, sagas) {
    if (error) {
      callback(error);
      return;
    }

    const linkerCode = generateLinker(sagas, SAGAS_LINKER_TEMPLATE);
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
    const watcher = chokidar.watch(SAGA_FILE_PATTERN);
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
