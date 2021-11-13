import { Application } from "express";
import { body } from "express-validator";
import { CommonRoutesConfig } from "../common/common.routes.config";
import usersController from "./controllers/users.controller";
import bodyValidationMiddleware from "../common/middleware/body.validation.middleware";
import usersMiddleware from "./middleware/users.middleware";
import jwtMiddleware from "../auth/middleware/jwt.middleware";
import permissionMiddleware from "../common/middleware/common.permission.middleware";
import { PermissionFlag } from "../common/middleware/common.permissionflag.enum";

export class UserRoutes extends CommonRoutesConfig {
	constructor(app: Application) {
		super(app, "UserRoutes");
	}

	configureRoutes(): Application {
		this.app
			.route("/users")
			.get(
				jwtMiddleware.validJWTNeeded,
				body("userIds").isArray(),
				bodyValidationMiddleware.verifyBodyFieldsErrors,
				usersController.getUsersByIds
			)
			.post(
				body("email").isEmail(),
				body("password")
					.isLength({ min: 5 })
					.withMessage("Must include password (5+ characters)"),
				body("permissionFlags")
					.isInt({ max: 2 })
					.withMessage("Must include permissionFlags (1 or 2)"),
				body("firstName").isString().optional(),
				body("lastName").isString().optional(),
				bodyValidationMiddleware.verifyBodyFieldsErrors,
				usersMiddleware.validateSameEmailDoesntExist,
				usersController.createUser
			);

		this.app.param("userId", usersMiddleware.extractUserId);
		this.app
			.route("/users/:userId")
			.all(
				usersMiddleware.validateUserExists,
				jwtMiddleware.validJWTNeeded,
				permissionMiddleware.onlySameUserOrNurseCanAccess
			)
			.get(usersController.getUserById)
			.put(
				body("email").isEmail(),
				body("password")
					.isLength({ min: 5 })
					.withMessage("Must include password (5+ characters)"),
				body("firstName").isString(),
				body("lastName").isString(),
				body("permissionFlags").isInt(),
				bodyValidationMiddleware.verifyBodyFieldsErrors,
				usersMiddleware.validateSameEmailBelongsToSameUser,
				usersMiddleware.userCantChangePermission,
				usersController.putUser
			)
			.patch(
				body("email").isEmail().optional(),
				body("password")
					.isLength({ min: 5 })
					.withMessage("Must include password (5+ characters)")
					.optional(),
				body("firstName").isString().optional(),
				body("lastName").isString().optional(),
				body("permissionFlags").isInt().optional(),
				bodyValidationMiddleware.verifyBodyFieldsErrors,
				usersMiddleware.validatePatchEmail,
				usersMiddleware.userCantChangePermission,
				usersController.patchUser
			)
			.delete(usersController.removeUser);

		this.app
			.route("/users/:userId/data")
			.all(
				usersMiddleware.validateUserExists,
				jwtMiddleware.validJWTNeeded,
				permissionMiddleware.onlySameUserOrNurseCanAccess
			)
			.get(usersController.getUserData)
			.post(
				body("location").isString(),
				bodyValidationMiddleware.verifyBodyFieldsErrors,
				usersController.addUserData
			);

		this.app.put("/users/:userId/permissionFlags/:permissionFlags", [
			jwtMiddleware.validJWTNeeded,
			permissionMiddleware.onlySameUserOrAdminCanAccess,
			permissionMiddleware.permissionFlagRequired(
				PermissionFlag.ADMIN_PERMISSION
			),
			usersController.updatePermissionFlags,
		]);

		return this.app;
	}
}
