import path from "path";
import webpack, { Configuration, Entry, WebpackPluginInstance } from "webpack";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import WorkboxPlugin from "workbox-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

import { IS_DEV, DIST_DIR, SRC_DIR } from "./env";

import fileLoader from "./loaders/file";
import cssLoader from "./loaders/css";
import jsLoader from "./loaders/js";

const webpackPlugins = [
  new CopyPlugin({
    patterns: [
      { from: "public/images", to: "images" },
      { from: "public/assets", to: "assets" },
      { from: "public/music", to: "music" },
      {
        from: "public/*",
        to: "[name][ext]",
        globOptions: {
          dot: true,
          gitignore: true,
          ignore: ["**/index.html"],
        },
      },
    ],
  }),
  new HtmlWebpackPlugin({
    template: "public/index.html",
    window: {
      devMode: IS_DEV,
    },
  }),
  new MiniCssExtractPlugin({
    filename: "[name].css",
  }),
  new webpack.HotModuleReplacementPlugin(),
];

if (!IS_DEV) {
  webpackPlugins.push(
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 100 * 1024 * 1024,
      swDest: "serviceWorker.js",
    })
  );
}

const config: Configuration = {
  target: "web",
  entry: [
    IS_DEV && "react-hot-loader/patch",
    // Entry для работы HMR
    IS_DEV && "webpack-hot-middleware/client",
    IS_DEV && "css-hot-loader/hotModuleReplacement",
    path.join(SRC_DIR, "index"),
  ].filter(Boolean) as unknown as Entry,
  module: {
    rules: [fileLoader.client, cssLoader.client, jsLoader.client],
  },
  output: {
    path: DIST_DIR,
    filename: "[name].js",
    publicPath: "/",
  },
  resolve: {
    modules: ["src", "node_modules"],
    alias: { "react-dom": "@hot-loader/react-dom" },
    extensions: ["*", ".js", ".jsx", ".json", ".ts", ".tsx"],
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
  },
  plugins: webpackPlugins.filter(Boolean) as WebpackPluginInstance[],

  devtool: "source-map",

  performance: {
    hints: IS_DEV ? false : "warning",
  },
};

export default config;
