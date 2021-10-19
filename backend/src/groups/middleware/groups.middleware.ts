import { RequestHandler } from "express";

class GroupsMiddleware {
	extractGroupId: RequestHandler = async (req, res, next) => {
		req.body.groupId = req.params.groupId;
		next();
	};

	validateGroupExists: RequestHandler = async (req, res, next) => {
		// Check if group exists
		next();
	};

	validateUserAdminOfGroup: RequestHandler = async (req, res, next) => {
		// Check if requesting user is admin of group
		next();
	};
}

export default new GroupsMiddleware();
