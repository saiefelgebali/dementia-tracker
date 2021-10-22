import { RequestHandler } from "express";
import groupsService from "../services/groups.service";

class GroupsMiddleware {
	extractGroupId: RequestHandler = async (req, res, next) => {
		req.body.groupId = req.params.groupId;
		next();
	};

	validateGroupExists: RequestHandler = async (req, res, next) => {
		// Check if group exists
		const group = await groupsService.readById(req.params.groupId);
		if (group) {
			// Cache group in res.locals
			res.locals.group = group;
			return next();
		}
		return res.status(404).send({
			error: `Group ${req.params.groupId} not found`,
		});
	};

	validateUserAdminOfGroup: RequestHandler = async (req, res, next) => {
		// Check if requesting user is admin of group
		next();
	};
}

export default new GroupsMiddleware();
