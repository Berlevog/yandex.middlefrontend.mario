import CopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import webpack, { Configuration, WebpackPluginInstance } from "webpack";
import WorkboxPlugin from "workbox-webpack-plugin";
import { DIST_DIR, IS_DEV, SRC_DIR } from "./env";
import cssLoader from "./loaders/css";
import fileLoader from "./loaders/file";
import jsLoader from "./loaders/js";
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';


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
          ignore: ["**/index.html"]
        }
      }
    ]
  }),
  new HtmlWebpackPlugin({
    template: "public/index.html",
    window: {
      devMode: IS_DEV
    }
  }),
  new MiniCssExtractPlugin({
    filename: "[name].css"
  }),
  new webpack.HotModuleReplacementPlugin()
];
if (!IS_DEV) {
  webpackPlugins.push(
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 100 * 1024 * 1024,
      swDest: "serviceWorker.js"
    })
  );
}

const config: Configuration = {
  target: "web",
  //@ts-ignore
  entry: [
    path.join(SRC_DIR, "index"),
    // 'webpack/hot/dev-server',
    // Entry для работы HMR
    // "css-hot-loader/hotModuleReplacement",
    IS_DEV && 'webpack-hot-middleware/client',

  ].filter(Boolean),
  module: {
    rules: [jsLoader.client, fileLoader.client, cssLoader.client,

    ]
  },
  output: {
    path: DIST_DIR,
    filename: "[name].js",
    publicPath: "/"
  },
  resolve: {
    modules: ["src", "node_modules"],
    // alias: { "react-dom": "@hot-loader/react-dom" },
    extensions: ["*", ".js", ".jsx", ".json", ".ts", ".tsx"],
    plugins: [
      new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
  },
  plugins: [
    //@ts-ignore
    IS_DEV && new webpack.HotModuleReplacementPlugin(),
    //@ts-ignore
    IS_DEV && new ReactRefreshWebpackPlugin({
      overlay: {
        sockIntegration: 'whm',
      },
    }), ...webpackPlugins.filter(Boolean) as WebpackPluginInstance[]],
  devtool: "source-map",
  performance: {
    hints: IS_DEV ? false : "warning"
  }
};
export default config;
