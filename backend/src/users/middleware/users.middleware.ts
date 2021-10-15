import debug from "debug";
import { RequestHandler } from "express-serve-static-core";
import usersService from "../services/users.service";

const debugLog = debug("app:users-middleware");

class UsersMiddleware {
	validateSameEmailDoesntExist: RequestHandler = async (req, res, next) => {
		const user = await usersService.getUserByEmail(req.body.email);
		if (user)
			return res
				.status(400)
				.send({ error: `A user with that email already exists.` });
		return next();
	};
	validateSameEmailBelongsToSameUser: RequestHandler = async (
		req,
		res,
		next
	) => {
		if (res.locals.user._id === req.params.userId) return next();
		return res.status(400).send({ error: `Invalid email` });
	};
	validatePatchEmail: RequestHandler = async (req, res, next) => {
		if (req.body.email)
			return this.validateSameEmailBelongsToSameUser(req, res, next);
		return next();
	};
	validateUserExists: RequestHandler = async (req, res, next) => {
		const user = await usersService.readById(req.params.userId);
		if (user) {
			// Cache user in res.locals
			res.locals.user = user;
			return next();
		}
		return res.status(404).send({
			error: `User ${req.params.userId} not found`,
		});
	};
	extractUserId: RequestHandler = async (req, res, next) => {
		req.body.id = req.params.userId;
		next();
	};
	userCantChangePermission: RequestHandler = async (req, res, next) => {
		if (
			"permissionFlags" in req.body &&
			req.body.permissionFlags !== res.locals.user.permissionFlags
		) {
			return res
				.status(400)
				.send({ errors: ["User cannot change permission flags"] });
		}
		return next();
	};
}

export default new UsersMiddleware();
