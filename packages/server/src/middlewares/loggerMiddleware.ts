import { NextFunction, Request, Response } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
	console.log("Request URL:", req.originalUrl);
	next();
};


