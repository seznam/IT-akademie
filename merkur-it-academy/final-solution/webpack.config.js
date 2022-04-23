const {
  createLiveReloadServer,
  createWebConfig,
  createNodeConfig,
  applyES5Transformation,
  applyES9Transformation,
  applyStyleLoaders,
  pipe,
} = require('@merkur/tool-webpack');

const { applyBabelLoader } = require('./tools/babelLoaders');
const { applyAliases } = require('./tools/utilityLoaders');

const context = {
  useLessLoader: true,
};

module.exports = createLiveReloadServer().then(() =>
  Promise.all([
    pipe(
      createWebConfig,
      applyAliases,
      applyStyleLoaders,
      applyBabelLoader
    )(context),
    pipe(
      createWebConfig,
      applyAliases,
      applyStyleLoaders,
      applyBabelLoader,
      applyES5Transformation
    )(context),
    pipe(
      createWebConfig,
      applyAliases,
      applyStyleLoaders,
      applyBabelLoader,
      applyES9Transformation
    )(context),
    pipe(
      createNodeConfig,
      applyAliases,
      applyStyleLoaders,
      applyBabelLoader
    )(context),
  ])
);
