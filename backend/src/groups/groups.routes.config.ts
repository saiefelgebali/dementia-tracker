import { Application } from "express";
import { body } from "express-validator";
import jwtMiddleware from "../auth/middleware/jwt.middleware";
import { CommonRoutesConfig } from "../common/common.routes.config";
import bodyValidationMiddleware from "../common/middleware/body.validation.middleware";
import permissionMiddleware from "../common/middleware/common.permission.middleware";
import { PermissionFlag } from "../common/middleware/common.permissionflag.enum";
import usersMiddleware from "../users/middleware/users.middleware";
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
					PermissionFlag.ADMIN_PERMISSION
				)
				// list all groups
			)
			.post(
				permissionMiddleware.permissionFlagRequired(
					PermissionFlag.NURSE_PERMISSION
				)
				// create a new group with requesting nurse as 1st admin
			);

		this.app.param("groupId", groupsMiddleware.extractGroupId);

		this.app
			.route("/groups/:groupId")
			.all(
				groupsMiddleware.validateGroupExists,
				jwtMiddleware.validJWTNeeded
			)
			.get
			// return group data
			()
			.delete
			// remove group from database
			();

		this.app.route("/groups/:groupId/users");

		return this.app;
	}
}
