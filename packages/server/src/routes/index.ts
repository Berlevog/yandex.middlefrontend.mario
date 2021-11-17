import express from "express";
import path from "path";

import { renderMiddleware } from "../middlewares";
import { WebpackBuildConfigOptionsType } from "../webpack/types";

import { comments, threads, emojies, themes, users } from "../api/routes/v1";

export function routes(app: express.Application, options: WebpackBuildConfigOptionsType) {
  app.use("/favicon.ico", (req, res) => res.status(200).send());
  app.use("/robots.txt", express.static(path.join(options.buildPath, "robots.txt")));

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
