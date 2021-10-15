import { RequestHandler } from "express";
import { print } from "./console";

export const logger: RequestHandler = (req, res, next) => {
	print(`${req.protocol}://${req.get("host")}${req.originalUrl}`, {
		tag: req.method,
		tagStyle: "FgCyan",
	});
	next();
};
