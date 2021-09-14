/*
 * Copyright (c) 2021. Written by Leonid Artemev (me@artemev.it)
 */

module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ["plugin:react/recommended", "standard", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react-hooks", "@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-use-before-define": ["error"],
  },
};
