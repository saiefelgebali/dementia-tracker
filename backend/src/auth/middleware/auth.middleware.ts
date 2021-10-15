import { RequestHandler } from "express";
import { compare } from "bcrypt";
import usersService from "../../users/services/users.service";
import debug from "debug";

const debugLog = debug("app:auth-middleware");

class AuthMiddleware {
	verifyUserPassword: RequestHandler = async (req, res, next) => {
		const user = await usersService.getUserByEmailWithPassword(
			req.body.email
		);

		if (user) {
			const passwordHash = user.password;
			if (await compare(req.body.password, passwordHash)) {
				req.body = {
					userId: user._id,
					email: user.email,
					permissionFlags: user.permissionFlags,
				};
				return next();
			}
		}

		// Giving the same message in both cases
		// helps protect against cracking attempts:
		res.status(400).send({ errors: ["Invalid email and/ or password"] });
	};
}

export default new AuthMiddleware();
