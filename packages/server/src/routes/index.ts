import * as bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import helmet from "helmet";
import path from "path";
import { comments, emojies, themes, threads, users } from "../api/routes/v1";
import { csp, generateNonceId } from "../csp";
import { renderMiddleware } from "../middlewares";
import { authMiddleware } from "../middlewares/authMiddleware";
import * as health from "../middlewares/health";
import { WebpackBuildConfigOptionsType } from "../webpack/types";

export function routes(app: express.Application, options: WebpackBuildConfigOptionsType) {
  app.use("/favicon.ico", (req, res) => res.status(200).send());
  app.use("/robots.txt", express.static(path.join(options.buildPath, "robots.txt")));

  app.get("/api/health", health.get);

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

  app.get("/*", authMiddleware, renderMiddleware);
  app.use(express.static(options.buildPath));
}
