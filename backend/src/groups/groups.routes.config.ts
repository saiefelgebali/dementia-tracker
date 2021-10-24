import { Application } from "express";
import { body } from "express-validator";
import jwtMiddleware from "../auth/middleware/jwt.middleware";
import { CommonRoutesConfig } from "../common/common.routes.config";
import bodyValidationMiddleware from "../common/middleware/body.validation.middleware";
import permissionMiddleware from "../common/middleware/common.permission.middleware";
import { PermissionFlag } from "../common/middleware/common.permissionflag.enum";
import usersMiddleware from "../users/middleware/users.middleware";
import groupsController from "./controllers/groups.controller";
import groupsMiddleware from "./middleware/groups.middleware";

export class GroupRoutes extends CommonRoutesConfig {
	constructor(app: Application) {
		super(app, "GroupRoutes");
	}
	protected configureRoutes(): Application {
		this.app
			.route("/groups")
			.get(
				jwtMiddleware.validJWTNeeded,
				permissionMiddleware.permissionFlagRequired(
					PermissionFlag.NURSE_PERMISSION
				),
				groupsController.listGroupsByUser
			)
			.post(
				jwtMiddleware.validJWTNeeded,
				permissionMiddleware.permissionFlagRequired(
					PermissionFlag.NURSE_PERMISSION
				),
				body("name").isString(),
				bodyValidationMiddleware.verifyBodyFieldsErrors,
				// create a new group with requesting nurse as 1st admin
				groupsController.createGroup
			);

		this.app.param("groupId", groupsMiddleware.extractGroupId);

		this.app
			.route("/groups/:groupId")
			.all(
				groupsMiddleware.validateGroupExists,
				jwtMiddleware.validJWTNeeded
			)
			.get(
				// return group data
				groupsMiddleware.validateGroupExists,
				groupsController.getGroupById
			)
			.patch(
				body("name").isString().optional(),
				bodyValidationMiddleware.verifyBodyFieldsErrors,
				groupsController.patchGroup
			)
			.delete(
				// remove group from database
				jwtMiddleware.validJWTNeeded,
				groupsMiddleware.validateGroupExists,
				groupsMiddleware.validateUserAdminOfGroup,
				permissionMiddleware.permissionFlagRequired(
					PermissionFlag.NURSE_PERMISSION
				),
				groupsController.removeGroup
			);

		this.app
			.route("/groups/:groupId/patients/:userId")
			.all(usersMiddleware.validateUserExists)
			.post(
				jwtMiddleware.validJWTNeeded,
				permissionMiddleware.permissionFlagRequired(
					PermissionFlag.NURSE_PERMISSION
				),
				groupsController.addPatient
			)
			.delete(
				jwtMiddleware.validJWTNeeded,
				permissionMiddleware.permissionFlagRequired(
					PermissionFlag.NURSE_PERMISSION
				),
				groupsController.removePatient
			);

		this.app
			.route("/groups/:groupId/nurses/:userId")
			.all(usersMiddleware.validateUserExists)
			.post(
				jwtMiddleware.validJWTNeeded,
				permissionMiddleware.permissionFlagRequired(
					PermissionFlag.NURSE_PERMISSION
				),
				groupsController.addNurse
			)
			.delete(
				jwtMiddleware.validJWTNeeded,
				permissionMiddleware.permissionFlagRequired(
					PermissionFlag.NURSE_PERMISSION
				),
				groupsController.removeNurse
			);

		return this.app;
	}
}
