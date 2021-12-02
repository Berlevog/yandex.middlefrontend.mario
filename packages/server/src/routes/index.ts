import express from "express";
import helmet from "helmet";
import path from "path";
import * as bodyParser from 'body-parser';
import compression from 'compression';
import { generateNonceId, csp } from '../csp';
import { renderMiddleware } from "../middlewares";
import { WebpackBuildConfigOptionsType } from "../webpack/types";

import { comments, threads, emojies, themes, users } from "../api/routes/v1";

export function routes(app: express.Application, options: WebpackBuildConfigOptionsType) {
  app.use("/favicon.ico", (req, res) => res.status(200).send());
  app.use("/robots.txt", express.static(path.join(options.buildPath, "robots.txt")));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // CSP
  app.use(generateNonceId);
  app.use(csp(options));

  // Sets "X-Content-Type-Options: nosniff"
  app.use(helmet.noSniff());

  // Sets "X-XSS-Protection: 0"
  app.use(helmet.xssFilter());

  // compression
  app.use(compression({ level: 5 }));

  // for PWA
  app.use("/service-worker.js", express.static(path.join(options.buildPath, "service-worker.js")));
  app.use("/manifest.webmanifest", express.static(path.join(options.buildPath, "manifest.webmanifest")));

  // Forum API
  app.use("/api/v1/thread", threads);
  app.use("/api/v1/comment", comments);
  app.use("/api/v1/emoji", emojies);
  // Theme API
  app.use("/api/v1/theme", themes);
  app.use("/api/v1/user", users);

  app.get("/*", renderMiddleware);
  app.use(express.static(options.buildPath));
}
