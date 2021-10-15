import debug from "debug";
import { RequestHandler } from "express-serve-static-core";
import { PermissionFlag } from "./common.permissionflag.enum";

const debugLog = debug("app:common-permission-middleware");

class PermissionMiddleware {
	/**
	 * Use factory pattern to generate appropriate
	 * middleware for desired permission level.
	 */
	permissionFlagRequired = (requiredPermissionFlag: PermissionFlag) => {
		const middleware: RequestHandler = (req, res, next) => {
			try {
				const userPermissionFlags = parseInt(
					res.locals.jwt.permissionFlags
				);
				// If user has required permission, allow access
				debugLog(
					`User permissionFlags: ${userPermissionFlags}. permissionFlags required: ${requiredPermissionFlag}.`
				);
				if (userPermissionFlags & requiredPermissionFlag) {
					return next();
				}
				// otherwise send a 403 Forbidden response
				return res.status(403).send({
					errors: ["You do not have permission to access this route"],
				});
			} catch (error) {
				debugLog(error);
			}
		};

		return middleware;
	};

	onlySameUserOrAdminCanAccess: RequestHandler = (req, res, next) => {
		const userPermissionFlags = parseInt(res.locals.jwt.permissionFlags);

		// Allow access if same user
		if (req.params?.userId && req.params.userId === res.locals.jwt.userId)
			return next();

		// Allow access if admin
		if (userPermissionFlags & PermissionFlag.ADMIN_PERMISSION)
			return next();

		// otherwise deny access
		return res.status(403).send();
	};
}

export default new PermissionMiddleware();
