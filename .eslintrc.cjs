module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {},
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    sourceType: "module",
  },
};
