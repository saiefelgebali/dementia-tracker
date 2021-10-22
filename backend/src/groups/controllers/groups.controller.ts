import { RequestHandler } from "express";
import usersService from "../../users/services/users.service";
import groupsService from "../services/groups.service";
import debug from "debug";

const debugLog = debug("app:groups-controller");

class GroupController {
	listGroups: RequestHandler = async (req, res) => {
		const { offset = 0, limit = 100 } = req.body;
		const groups = await usersService.list(offset, limit);
		return res.status(200).send(groups);
	};

	getGroupById: RequestHandler = async (req, res) => {
		const group = await groupsService.readById(req.params.groupId);
		return res.status(200).send(group);
	};

	createGroup: RequestHandler = async (req, res) => {
		const groupId = await groupsService.create({
			nurseId: res.locals.jwt.userId,
			...req.body,
		});
		debugLog(`created group ${groupId}`);
		return res.status(201).send({ id: groupId });
	};

	patchGroup: RequestHandler = async (req, res) => {
		const result = await groupsService.patchById(
			req.body.groupId,
			req.body
		);
		return res.status(204).send();
	};

	putGroup: RequestHandler = async (req, res) => {
		const result = await groupsService.putById(req.body.groupId, req.body);
		return res.status(204).send();
	};

	removeGroup: RequestHandler = async (req, res) => {
		const result = await groupsService.deleteById(req.body.groupId);
		debugLog(`removed group ${req.body.id}`);
		return res.status(204).send();
	};

	addPatient: RequestHandler = async (req, res) => {
		const result = await groupsService.addPatientToGroup(
			req.body.groupId,
			req.body.id
		);
		return res.status(204).send();
	};

	addNurse: RequestHandler = async (req, res) => {
		const result = await groupsService.addNurseToGroup(
			req.body.groupId,
			req.body.id
		);
		return res.status(204).send();
	};
}

export default new GroupController();
