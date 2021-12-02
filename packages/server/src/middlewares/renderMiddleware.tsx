import { ServerStyleSheets } from "@material-ui/core/styles";
import chalk from "chalk";
import { Request, Response } from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { Provider as ReduxProvider } from "react-redux";
import { StaticRouterContext } from "react-router";
import { StaticRouter } from "react-router-dom";
import Helmet from 'react-helmet';

const escape = (str: string) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};


export default async (req: Request, res: Response) => {
  const { getStore, App } = await import("@mario/client");
  const location = req.url;
  const { nonce } = res.locals;
  const context: StaticRouterContext = {};
  const { store } = getStore(location);

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
  res.status(context.statusCode || 200).send(getHtml(reactHtml, reduxState, sheets.toString(), nonce, meta));
};

function getHtml(reactHtml: string, reduxState:string, css: string ,nonce:string, meta:any) {
  return `
        <!DOCTYPE html>
        <html lang="en">
          <head>
              <meta charset="utf-8" />
              <meta content="width=device-width, initial-scale=1" name="viewport" />
              <meta content="#000000" name="theme-color" />
              <meta content="Mario game" name="description" />
              <link href="manifest.json" rel="manifest" />
              <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&family=VT323&display=swap" rel="stylesheet" />
              <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
              <title>Mario Pro Max | SSR</title>
              <meta property="csp-nonce" content="${nonce}">
              ${meta}
              <style id="jss-server-side" nonce="${nonce}">${css}</style>
          </head>
          <body>
              <div id="root">${reactHtml}</div>
              <script nonce="${nonce}" id="initial-data" type="text/plain" data-json="${escape(reduxState)}"></script>
              <script defer src="/runtime~main.js" nonce="${nonce}"></script>
              <script defer src="/main.js" nonce="${nonce}"></script>
          </body>
        </html>
    `;
}
