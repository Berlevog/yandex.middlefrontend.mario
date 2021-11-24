import express from "express";
import path from "path";

import { renderMiddleware } from "../middlewares";
import { WebpackBuildConfigOptionsType } from '../webpack/types';

export function routes(app: express.Application, options:WebpackBuildConfigOptionsType) {
	app.use('/favicon.ico', (req, res) => res.status(200).send());
	app.use('/robots.txt', express.static(path.join(options.buildPath,'robots.txt')));

	// for PWA
	app.use('/service-worker.js', express.static(path.join(options.buildPath,'service-worker.js')));
	app.use('/manifest.json', express.static(path.join(options.buildPath,'manifest.json')));
	app.use('/manifest.webmanifest', express.static(path.join(options.buildPath,'manifest.webmanifest')));

	app.get("/*", renderMiddleware);
	app.use(express.static(options.buildPath));

}
