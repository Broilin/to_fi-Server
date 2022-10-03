module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-empty-pattern': ['off'],
    'func-names': ['off'],
    'default-param-last': ['off'],
    'import/extensions': ['off'],
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
    'react/jsx-filename-extension': [1, {extensions: ['.js', '.jsx', '.tsx']}],
    'no-use-before-define': [
      'off',
      {functions: true, classes: true, variables: false},
    ],
    'react/function-component-definition': [
      'off',
      {namedcomponents: 'arrow-function'},
    ],
    'react/prop-types': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {},
    },
  },
};
