import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: { ecmaVersion: 2018, sourceType: 'module' },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      'no-irregular-whitespace': 'error',
      'no-multiple-empty-lines': ['error', { max: 2 }],
    },
  },
];
