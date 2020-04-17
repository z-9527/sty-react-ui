module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'standard',
    "plugin:react/recommended"
  ],
  "parser": "babel-eslint",
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    semi: ["error", "always"],  //语句必须用;
    "space-before-function-paren": 0,
    "no-unused-vars": 1
  }
}
