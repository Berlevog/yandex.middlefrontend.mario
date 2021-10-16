const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require("fs-extra");
const WorkboxPlugin = require("workbox-webpack-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = async (env, argv) => {
  const production = argv.mode === "production";
  const cssLoader = production ? MiniCssExtractPlugin.loader : "style-loader";
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
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:5].css",
    }),
  ];

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

  return {
    mode: argv.mode,
    entry: {
      main: path.join(__dirname, "src", "index.tsx"),
    },
    target: "web",
    devtool: "inline-source-map",
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    optimization: {
      runtimeChunk: "single",
    },
    output: {
      clean: true,
      path: path.join(__dirname, "/build"),
      filename: "[name].[contenthash:5].js",
    },

    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
            },
          },
        },
        {
          test: /\.css$/i,
          use: [
            cssLoader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: true,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      "autoprefixer",
                      {
                        // Options
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
      ],
    },
    devServer: {
      port: 3000,
      historyApiFallback: true,
    },
    plugins: webpackPlugins,
  };
};
