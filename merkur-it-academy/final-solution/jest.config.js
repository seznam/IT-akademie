const path = require('path');

const config = require('@merkur/tools/jest.config.js');

config.setupFilesAfterEnv = ['./jest.setup.js'];
config.snapshotSerializers = ['enzyme-to-json/serializer'];

const projectDir = path.resolve('./');

config.moduleNameMapper = {
  '^#/(.+)': `${projectDir}/src/$1`,
  '\\.(css|less)$': 'identity-obj-proxy',
};
config.modulePaths = [`${projectDir}/node_modules`];
config.transform = {
  '^.+\\.(t|j|cj|mj)sx?$': [
    'babel-jest',
    {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: '16',
            },
          },
        ],
        ['@babel/preset-react', { pragma: 'h' }],
      ],
    },
  ],
};

module.exports = {
  ...config,
};
