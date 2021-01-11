module.exports = {
  plugins: ['@typescript-eslint', 'no-loops', 'prettier'],
  env: {
    node: true,
  },
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'prettier/prettier': 'error',
    'no-loops/no-loops': 2,
    'no-console': 0,
    'import/prefer-default-export': 0,
    '@typescript-eslint/explicit-function-return-type': ['error'],
    '@typescript-eslint/dot-notation': 'off',
    '@typescript-eslint/no-implied-eval': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
};
