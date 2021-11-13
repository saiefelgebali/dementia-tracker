import UsersDao from "../daos/users.dao";
import { CRUD } from "../../common/interfaces/crud.interface";
import { CreateUserDto } from "../dto/create.user.dto";
import { PutUserDto } from "../dto/put.user.dto";
import { PatchUserDto } from "../dto/patch.user.dto";
import { CreateUserDataDto } from "../dto/create.user.data.dto";

class UserService implements CRUD {
	list = (offset: number, limit: number) => {
		return UsersDao.getUsers(offset, limit);
	};
	create = (resource: CreateUserDto) => {
		return UsersDao.addUser(resource);
	};
	putById = (id: string, resource: PutUserDto) => {
		return UsersDao.updateUserById(id, resource);
	};
	readById = (id: string) => {
		return UsersDao.getUserById(id);
	};
	deleteById = (id: string) => {
		return UsersDao.removeUserById(id);
	};
	patchById = (id: string, resource: PatchUserDto) => {
		return UsersDao.updateUserById(id, resource);
	};

	getUsersByIds = (userIds: string[]) => {
		return UsersDao.getUsersByIds(userIds);
	};
	getUserByEmail = (email: string) => {
		return UsersDao.getUserByEmail(email);
	};
	getUserByEmailWithPassword = (email: string) => {
		return UsersDao.getUserByEmailWithPassword(email);
	};

	addUserData = (id: string, data: CreateUserDataDto) => {
		return UsersDao.addUserData(id, data);
	};
	deleteUserDataById = (id: string) => {
		return UsersDao.deleteUserDataById(id);
	};
	getUserData = (id: string, offset: number, limit: number) => {
		return UsersDao.getUserData(id, offset, limit);
	};
}

export default new UserService();
