import UsersDao from "../daos/users.dao";
import { CRUD } from "../../common/interfaces/crud.interface";
import { CreateUserDto } from "../dto/create.user.dto";
import { PutUserDto } from "../dto/put.user.dto";
import { PatchUserDto } from "../dto/patch.user.dto";

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

	getUserByEmail = (email: string) => {
		return UsersDao.getUserByEmail(email);
	};
	getUserByEmailWithPassword = (email: string) => {
		return UsersDao.getUserByEmailWithPassword(email);
	};
}

export default new UserService();
