module.exports = {
  env: {
    browser: true,
    es2022: true,
    jest: true,
  },
  extends: ['prettier'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  plugins: [],
  rules: {
    'no-console': 'warn',
  },
};
