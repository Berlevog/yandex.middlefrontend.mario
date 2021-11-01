import path from "path";
import express, { RequestHandler } from "express";
import "babel-polyfill";
import serverRenderMiddleware from "./server-render-middleware";
import webpack from "webpack";
import devMiddleware from "webpack-dev-middleware";
import hotMiddleware from "webpack-hot-middleware";
import config from "../webpack/client.config";

function getWebpackMiddlewares(config: webpack.Configuration): RequestHandler[] {
  const compiler = webpack({ ...config, mode: "development" });

  return [
    devMiddleware(compiler, {
      publicPath: "/",
    }),
    hotMiddleware(compiler, { path: `/__webpack_hmr` }),
  ];
}

const app = express();

app.use(express.static(path.resolve(__dirname, "../dist")));

app.get("/*", [...getWebpackMiddlewares(config)], serverRenderMiddleware);

export { app };
