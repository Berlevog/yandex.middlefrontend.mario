function isWebTarget(caller) {
  return Boolean(caller && caller.target === "web");
}

function isWebpack(caller) {
  return Boolean(caller && caller.name === "babel-loader");
}

module.exports = api => {
  const web = api.caller(isWebTarget);
  const webpack = api.caller(isWebpack);
  return {
    presets: [
      "@babel/preset-typescript",
      "@babel/preset-react",
      [
        "@babel/preset-env"

      ]
    ],
    plugins: [
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-proposal-async-generator-functions",
      "@babel/plugin-transform-runtime",
    ]
  };
};
