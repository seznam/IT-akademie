const path = require('path');

function applyAliases(config) {
  config.resolve.alias = {
    '#': path.resolve(__dirname, '../src'),
  };

  return config;
}

module.exports = {
  applyAliases,
};
