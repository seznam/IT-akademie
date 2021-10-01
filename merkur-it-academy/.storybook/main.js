const fs = require('fs');
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { applyStyleLoaders, pipe } = require('@merkur/tool-webpack');
const { applyBabelLoader } = require('../tools/babelLoaders');
const { applyAliases } = require('../tools/utilityLoaders');

// Has to be required for storybook to work
require(path.resolve('./', 'webpack.config.js'));

function insertAfterLastAtStorybookEntry(entries, entry) {
	let lastAtStorybookIndex = entries.length - 1;

	for (let i = lastAtStorybookIndex; i >= 0; i--) {
		if (/@storybook/.test(entries[i])) {
			lastAtStorybookIndex = i;

			break;
		}
	}

	entries.splice(lastAtStorybookIndex + 1, 0, entry);
}

module.exports = {
  webpackFinal: async currentConfig => {
		return pipe(
			() => currentConfig,
			applyAliases,
			applyBabelLoader,
			(config, context) => {
				config = applyStyleLoaders(config, context);
				const lastRuleIndex = config.module.rules.length - 1;

				config.module.rules[lastRuleIndex].use.splice(0, 1, { loader: 'style-loader' });
				return config;
			},
			(config) => {
				// add widget client and styles to storybook build
				const clientJs = path.resolve('./', 'src/client.js');

				if (fs.existsSync(clientJs)) {
					/* We can't append it to the end, because Webpack
					would ignore CSS order. */
					insertAfterLastAtStorybookEntry(config.entry, clientJs);
				}

				config.resolve.alias.storybook = path.resolve(__dirname, '');

				// hide performance warnings
				config.performance = {
					maxEntrypointSize: 5120000,
					maxAssetSize: 5120000
				};

				return config;
			}
		)({
			isServer: false,
			useLessLoader: true,
		  });
	},
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
	'storybook-addon-outline',
	'storybook-addon-pseudo-states',
    {
			name: '@storybook/addon-essentials',
			options: {
				measure: false
			}
		},
    '@whitespace/storybook-addon-html',
	],
  core: {
    builder: 'webpack5'
  }
}