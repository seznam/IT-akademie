const path = require('path');

const {
  createLiveReloadServer,
  createWebConfig,
  createNodeConfig,
  applyES5Transformation,
  applyES9Transformation,
  applyStyleLoaders,
  createCacheKey,
  pipe,
} = require('@merkur/tool-webpack');

function applyBabelLoader(config, { isProduction, environment, cache }) {
  config.module.rules.push({
    test: /\.(js|ts|tsx|mjs|jsx)$/,
    exclude: /node_modules|node_modules\/abort-controller/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-react',
            {
              runtime: 'automatic',
              importSource: 'preact',
              development: !isProduction,
            },
          ],
        ],
        cacheIdentifier: createCacheKey(
          environment,
          config?.name,
          ...cache?.versionDependencies
        ),
        cacheDirectory: true,
        cacheCompression: false,
        compact: isProduction,
        sourceMaps: !isProduction,
        inputSourceMap: !isProduction,
      },
    },
  });

  return config;
}

function applyAliases(config) {
  config.resolve.alias = {
    '#': path.resolve(__dirname, './src'),
  };

  return config;
}

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
