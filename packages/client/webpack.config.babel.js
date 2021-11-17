import path, { resolve } from "path";
import nodeExternals from "webpack-node-externals";
import { webpack } from "webpack";
// import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ManifestPlugin from "webpack-manifest-plugin";
import PwaManifest from "webpack-pwa-manifest";
import { GenerateSW } from "workbox-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import RobotstxtPlugin from "robotstxt-webpack-plugin";

const DIST_PATH = path.resolve(__dirname, "dist");
const production = process.env.NODE_ENV === "production";
const development = !production;
const externals = ["react", "react-dom", "react-router", "react-router-dom", "redux", "react-redux"];


export const getConfig = target => {
  if (target === "node") {
    externals.push(nodeExternals());
  }

  return {
    name: target,
    mode: development ? "development" : "production",
    target,
    entry: `./src/main-${target}.tsx`,
    module: {
      rules: [
        {
          test: /\.([jt])sx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              caller: { target }
            }
          }
        }
      ]
    },
    externals,


    optimization: {
      runtimeChunk: target !== "node"
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".css"]
    },

    output: {
      path: path.join(DIST_PATH, target),
      filename: production ? "[name]-bundle-[chunkhash:8].js" : "[name].js",
      publicPath: `/dist/${target}/`,
      libraryTarget: target === "node" ? "commonjs2" : undefined
    },
    plugins: [

      production && new PwaManifest({
        filename: "manifest.webmanifest",
        name: "super-mario",
        short_name: "mario",
        theme_color: "#3498db",
        description: "Yandex Praktikum Education Project",
        background_color: "#f5f5f5",
        crossorigin: "use-credentials",
        icons: [
          {
            src: resolve("./assets/avatar.png"),
            sizes: [96, 128, 192, 256, 384, 512]
          }
        ]
      }),
      production && new GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        include: [/\.js$/],
        runtimeCaching: [
          {
            urlPattern: new RegExp("."), // for start_url
            handler: "StaleWhileRevalidate"
          },
          {
            urlPattern: new RegExp("api|graphql"),
            handler: "NetworkFirst"
          },
          {
            urlPattern: new RegExp("https://fonts.googleapis.com|https://fonts.gstatic.com"),
            handler: "CacheFirst"
          }
        ]
      }),
      new RobotstxtPlugin(),
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        openAnalyzer: false
      })
    ].filter(Boolean)
  };
};

export default [getConfig("web"), getConfig("node")];
