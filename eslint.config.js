const eslint = require('@eslint/js');
const globals = require('globals');

const typescriptEslint = require('typescript-eslint');

const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = [
  {
    ignores: ['**/eslint.config.js'],
  },

  eslint.configs.recommended,
  ...typescriptEslint.configs.recommendedTypeChecked,
  ...typescriptEslint.configs.stylisticTypeChecked,
  eslintConfigPrettier,

  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },

      parser: typescriptEslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    // Rules
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
