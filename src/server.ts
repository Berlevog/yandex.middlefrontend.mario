import path from "path";
import express, { RequestHandler } from "express";
import "babel-polyfill";
import serverRenderMiddleware from "./server-render-middleware";
import webpack from "webpack";
import devMiddleware from "webpack-dev-middleware";
import hotMiddleware from "webpack-hot-middleware";
import config from "../webpack/client.config";

const app = express();
const compiler = webpack({ ...config, mode: "development" });

const devServer = devMiddleware(compiler, {
  serverSideRender: true,
});

app.use(devServer);

// @ts-ignore
app.use(hotMiddleware(compiler));

app.use(express.static(path.resolve(__dirname, "../dist")));

app.get("/*", serverRenderMiddleware);

export { app };
