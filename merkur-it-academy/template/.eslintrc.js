let config = require('@merkur/tools/eslint.config');

module.exports = {
  ...config,
  ignorePatterns: [
    '.vscode',
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
  ],
  rules: {
    ...config.rules,
    'no-unused-vars': 'warn',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'preact{/**,**}',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@merkur{/**,**}',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '#/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '*.{less,json}',
            group: 'object',
            patternOptions: { matchBase: true },
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['#/', '@merkur'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
