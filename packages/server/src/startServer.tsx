import chalk from "chalk";
// import * as ejs from "ejs";
import express, { Express, json } from "express";
import * as path from "path";
import * as React from "react";
import loggerMiddleware from "./middlewares/loggerMiddleware";
import { renderMiddleware } from "./middlewares";

// import serializeJavascript from "serialize-javascript";
import webpack from "webpack";
import devMiddleware from "webpack-dev-middleware";
import hotMiddleware from "webpack-hot-middleware";
import { DEFAULT_SERVER_CONFIG, ServerConfig } from "./conf";
import { routes } from "./routes";
import { sequelize } from "./api/sequelize";

import { WebpackBuildConfigOptionsType } from "./webpack/types";

const createApp = () => {
  return express();
};

export async function startDevServer(
  options: WebpackBuildConfigOptionsType,
  compiler: webpack.Compiler,
  serverConfig: ServerConfig = DEFAULT_SERVER_CONFIG
) {
  const app = createApp();

  const devServer = devMiddleware(compiler, {
    serverSideRender: true,
    writeToDisk: true,
  });

  app.use(loggerMiddleware);
  app.use(devServer);

  // @ts-ignore
  app.use(hotMiddleware(compiler));

  devServer.waitUntilValid(() => {
    runServer(app, options, serverConfig);
  });
}

export function startProdServer(
  options: WebpackBuildConfigOptionsType,
  serverConfig: ServerConfig = DEFAULT_SERVER_CONFIG
) {
  const app = createApp();

  app.use("/static", express.static(path.join(options.buildPath, "client", "static")));

  runServer(app, options, serverConfig);
}

const runServer = (
  app: Express,
  options: WebpackBuildConfigOptionsType,
  { host, port }: ServerConfig = DEFAULT_SERVER_CONFIG
) => {
  (async () => {
    await sequelize.sync({ alter: true });
  })();

  app.use(json());

  routes(app, options);
  app.use(renderMiddleware);

  app.listen(port, host, () => {
    console.log(chalk.green(`Running on http://${host}:${port}/`));
  });
};
