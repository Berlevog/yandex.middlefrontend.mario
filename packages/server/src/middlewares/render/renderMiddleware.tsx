import { ServerStyleSheets } from "@material-ui/core/styles";
import chalk from "chalk";
import { NextFunction, Request, Response } from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import Helmet from "react-helmet";
import { Provider as ReduxProvider } from "react-redux";
import { StaticRouterContext } from "react-router";
import { StaticRouter } from "react-router-dom";
import { authMiddleware } from "../authMiddleware";
import { renderPage } from "./renderPage";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { getStore, App } = await import("@mario/client");
  const location = req.url;
  const { nonce } = res.locals;
  const context: StaticRouterContext = {};
  const { store } = getStore(location);

  await authMiddleware(req);

  const sheets = new ServerStyleSheets();

  const jsx = (
    <ReduxProvider store={store}>
      <StaticRouter context={context} location={location}>
        <App />
      </StaticRouter>
    </ReduxProvider>
  );
  const reactHtml = renderToString(sheets.collect(jsx));
  const reduxState = JSON.stringify(store.getState());
  const helmetContent = Helmet.renderStatic();
  const meta = `
      ${helmetContent.meta.toString()}
      ${helmetContent.title.toString()}
    `.trim();
  if (context.url) {
    res.redirect(context.url);
    return;
  }
  console.log(chalk.cyan("SSR:", req.url));
  res
    .status(context.statusCode || 200)
    .send(renderPage({ reactHtml, reduxState, css: sheets.toString(), nonce, meta }));
};
