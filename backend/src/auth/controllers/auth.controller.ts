import jwt from "jsonwebtoken";
import crypto from "crypto";
import debug from "debug";
import { RequestHandler } from "express";

const debugLog = debug("app:auth-controller");

// @ts-expect-error
const jwtSecret: string = process.env.JWT_SECRET;
const tokenExpirationInSeconds = 60 * 60 * 24;

class AuthController {
	createJWT: RequestHandler = async (req, res, next) => {
		try {
			const refreshId = req.body.userId + jwtSecret;
			const salt = crypto.createSecretKey(crypto.randomBytes(16));
			// Create refreshToken
			const hash = crypto
				.createHmac("sha512", salt)
				.update(refreshId)
				.digest("base64");
			req.body.refreshKey = salt.export();
			// Create accessToken
			const token = jwt.sign(req.body, jwtSecret, {
				expiresIn: tokenExpirationInSeconds,
			});
			return res
				.status(201)
				.send({ accessToken: token, refreshToken: hash });
		} catch (error) {
			// Handle internal error
			debugLog("createJWT error: %0", error);
			return res.status(500).send();
		}
	};
}

export default new AuthController();
