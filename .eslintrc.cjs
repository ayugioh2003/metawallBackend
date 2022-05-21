module.exports = {
  env: {
    browser: false, // 程式沒有要在瀏覽器執行，不應有 window, document 物件
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': ['off'],
    // import 檔案不檢驗 .js
    'import/extensions': ['error', 'ignorePackages', {
      js: 'always',
    }],
    semi: ['error', 'never'], // 結尾不加分號
    'no-console': ['error', { allow: ['warn', 'error'] }],
    quotes: ['error', 'single'], // 單引號
    indent: ['error', 2], // 縮排
    'no-multiple-empty-lines': ['error'], // 允許最大連續斷一行
  },
}
