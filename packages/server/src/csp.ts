import { Request, Response, NextFunction } from 'express';
import * as helmet from 'helmet';
import { nanoid } from 'nanoid'
import { WebpackBuildConfigOptionsType } from "./webpack/types";
import ua from 'ua-parser-js';

export function generateNonceId(req: Request, res: Response, next: NextFunction) {
  res.locals.nonce = Buffer.from(nanoid(32)).toString('base64');
  next();
}

// google font: https://stackoverflow.com/a/34576000/7014700
const baseDirectives: helmet.IHelmetContentSecurityPolicyDirectives = {
  defaultSrc: ["'none'"],
  styleSrc: ["'unsafe-inline'", 'fonts.googleapis.com'],
  fontSrc: ["'self'", 'fonts.gstatic.com', 'fonts.googleapis.com'],
  imgSrc: ["'self'", 'ya-praktikum.tech'], // for README
  connectSrc: ["'self'", 'fonts.googleapis.com', 'fonts.gstatic.com', 'ya-praktikum.tech'], // for service-worker
  workerSrc: ["'self'"],
  manifestSrc:["'self'"],
};

// chrome, firefox
const lv3Directives: helmet.IHelmetContentSecurityPolicyDirectives = {
  ...baseDirectives,
  scriptSrc: [(req, res) => `'nonce-${res.locals.nonce}'`, "'strict-dynamic'", "'unsafe-eval'"],
};

// safari
// TODO: cannot load a file to be imported as dynamic because cannot use strict-dynamic
const lv2Directives: helmet.IHelmetContentSecurityPolicyDirectives = {
  ...baseDirectives,
  scriptSrc: [
    "'self",
    (req, res) => `'nonce-${res.locals.nonce}'`,
    "'unsafe-eval'",
    "'unsafe-inline'",
  ],
};

export const csp = (options:WebpackBuildConfigOptionsType)=>(req: Request, res: Response, next: NextFunction)=> {
  const directives = ['Chrome', 'Firefox'].includes(
    // TODO: fix
    (ua as any)(req.headers['user-agent']).browser.name
  )
    ? lv3Directives
    : lv2Directives;

  helmet.contentSecurityPolicy({ directives, reportOnly:!options.isProduction })(req, res, next);
}
