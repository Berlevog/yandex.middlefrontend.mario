const build = require("./webpack/webpack.build");
const umd = require("./webpack/webpack.umd");
module.exports = [
  umd
];

module.exports.parallelism = 1;
