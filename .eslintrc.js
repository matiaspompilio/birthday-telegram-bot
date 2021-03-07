module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ["eslint:recommended", "airbnb-base"],
  plugins: ["prettier"],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'array-callback-return': 'warn',
    'no-return-assign': 'warn',
    'no-unused-expressions': 'warn'
  },
};
