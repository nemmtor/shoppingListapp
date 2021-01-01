module.exports = {
  plugins: ['react', '@typescript-eslint', 'no-loops', 'prettier'],
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    project: ['./tsconfig.json'],
    createDefaultProgram: true,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
    'plugin:prettier/recommended',
    'prettier',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  rules: {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    'react/prop-types': 0,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    // 'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-loops/no-loops': 2,
    'no-console': 0,
    'import/prefer-default-export': 0,
    '@typescript-eslint/explicit-function-return-type': ['error'],
  },
};
