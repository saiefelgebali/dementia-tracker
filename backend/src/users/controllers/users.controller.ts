import { hash } from "bcrypt";
import debug from "debug";
import { RequestHandler } from "express-serve-static-core";
import { PatchUserDto } from "../dto/patch.user.dto";
import usersService from "../services/users.service";

const debugLog = debug("app:users-controller");

const passwordSalt = process.env.PASSWORD_SALT || 10;

class UsersController {
	listUsers: RequestHandler = async (req, res) => {
		const { offset = 0, limit = 100 } = req.body;
		const users = await usersService.list(offset, limit);
		return res.status(200).send(users);
	};

	getUsersByIds: RequestHandler = async (req, res) => {
		const userIds = req.body.userIds;
		const users = await usersService.getUsersByIds(userIds);
		return res.status(200).send(users);
	};

	getUserById: RequestHandler = async (req, res) => {
		const user = await usersService.readById(req.params.userId);
		return res.status(200).send(user);
	};

	getMe: RequestHandler = async (req, res) => {
		const user = await usersService.getUserByEmail(res.locals.jwt.email);
		return res.status(200).send(user);
	};

	createUser: RequestHandler = async (req, res) => {
		debugLog(`hashing password...`);
		req.body.password = await hash(req.body.password, passwordSalt);
		const userId = await usersService.create(req.body);
		debugLog(`created user ${userId}`);
		return res.status(201).send({ id: userId });
	};

	patchUser: RequestHandler = async (req, res) => {
		if (req.body.password) {
			req.body.password = await hash(req.body.password, passwordSalt);
		}
		const result = await usersService.patchById(req.body.id, req.body);
		debugLog(`updated user ${req.body.id}, %O`, result);
		return res.status(204).send();
	};

	putUser: RequestHandler = async (req, res) => {
		req.body.password = await hash(req.body.password, passwordSalt);
		const result = await usersService.putById(req.body.id, req.body);
		debugLog(`updated user ${req.body.id}, %O`, result);
		return res.status(204).send();
	};

	removeUser: RequestHandler = async (req, res) => {
		const result = await usersService.deleteById(req.body.id);
		debugLog(`removed user ${req.body.id}`);
		return res.status(204).send();
	};

	updatePermissionFlags: RequestHandler = async (req, res) => {
		const patch: PatchUserDto = {
			permissionFlags: parseInt(req.params.permissionFlags),
		};
		const result = await usersService.patchById(req.body.id, patch);
		debugLog(`updated user ${req.body.id} permissions, %O`, result);
		return res.status(204).send();
	};

	addUserData: RequestHandler = async (req, res) => {
		const dataId = await usersService.addUserData(req.body.id, req.body);
		return res.status(201).send({ id: dataId });
	};

	getUserData: RequestHandler = async (req, res) => {
		const { offset = 0, limit = 100 } = req.body;
		const data = await usersService.getUserData(req.body.id, offset, limit);
		return res.status(200).send(data);
	};
}

export default new UsersController();
