import debug from "debug";
import { RequestHandler } from "express-serve-static-core";
import usersService from "../services/users.service";
import { ValidationError } from "express-validator";

const debugLog = debug("app:users-middleware");

class UsersMiddleware {
	validateSameEmailDoesntExist: RequestHandler = async (req, res, next) => {
		const user = await usersService.getUserByEmail(req.body.email);
		if (user)
			return res.status(400).send({
				errors: [
					{ msg: `A user with that email already exists.` },
				] as ValidationError[],
			});
		return next();
	};

	validateSameEmailBelongsToSameUser: RequestHandler = async (
		req,
		res,
		next
	) => {
		if (res.locals.user._id === req.params.userId) return next();
		return res.status(400).send({
			errors: [{ msg: `Invalid email` }] as ValidationError[],
		});
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
			errors: [
				{
					msg: `User ${req.params.userId} not found`,
				},
			] as ValidationError[],
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
			return res.status(400).send({
				errors: [
					{ msg: "User cannot change permission flags" },
				] as ValidationError[],
			});
		}
		return next();
	};
}

export default new UsersMiddleware();
