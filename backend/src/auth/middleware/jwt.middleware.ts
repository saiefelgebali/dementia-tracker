import usersService from "../../users/services/users.service";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { Jwt } from "../../common/types/jwt";

// @ts-expect-error
const jwtSecret: string = process.env.JWT_SECRET;

class JwtMiddleware {
	/**
	 * Validate whether the API consumer sent a valid JWT
	 * in the HTTP "Authorization" header,
	 * respecting the convention 'Bearer <token>'
	 */
	validJWTNeeded: RequestHandler = (req, res, next) => {
		if (req.headers.authorization) {
			try {
				const authorization = req.headers.authorization.split(" ");
				if (authorization[0] !== "Bearer")
					return res.status(401).send();
				res.locals.jwt = jwt.verify(authorization[1], jwtSecret) as Jwt;
				return next();
			} catch (error) {
				// JWT Verification was unsuccessful
				// Return 403 Forbidden
				return res.status(403).send();
			}
		}
		return res.status(401).send();
	};

	/**
	 * Verify if the refreshToken field is present
	 */
	verifyRefreshBodyField: RequestHandler = (req, res, next) => {
		if (req.body?.refreshToken) {
			return next();
		}
		return res
			.status(400)
			.send({ errors: ["Missing required field: refreshToken"] });
	};

	/**
	 * Verify if the refreshToken is valid for a specific user ID.
	 */
	validRefreshNeeded: RequestHandler = async (req, res, next) => {
		const user = await usersService.getUserByEmailWithPassword(
			res.locals.jwt.email
		);
		const salt = crypto.createSecretKey(
			Buffer.from(res.locals.jwt.refreshKey.data)
		);
		const hash = crypto
			.createHmac("sha512", salt)
			.update(res.locals.jwt.userId + jwtSecret)
			.digest("base64");
		if (hash === req.body.refreshToken) {
			req.body = {
				userId: user._id,
				email: user.email,
				permissionFlags: user.permissionFlags,
			};
			return next();
		}
		return res.status(400).send({ errors: ["Invalid refresh token"] });
	};
}

export default new JwtMiddleware();
