module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'import/extensions': 'never',
    'semi:': 'never', // 結尾不加分號
    'quotes': ['error', 'single'], // 單引號
    'indent': ['error', 2], // 縮排
  },
};
