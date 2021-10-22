import { CRUD } from "../../common/interfaces/crud.interface";
import groupsDao from "../daos/groups.dao";
import { CreateGroupDto } from "../dto/createGroup.dto";
import { PatchGroupDto } from "../dto/patch.group.dto";
import { PutGroupDto } from "../dto/put.group.dto";

class GroupService implements CRUD {
	list = (offset: number, limit: number) => {
		return groupsDao.getGroups(offset, limit);
	};
	create = (resource: CreateGroupDto) => {
		return groupsDao.addGroup(resource);
	};
	putById = (id: string, resource: PutGroupDto) => {
		return groupsDao.updateGroupById(id, resource);
	};
	readById = (id: string) => {
		return groupsDao.getGroupById(id);
	};
	deleteById = (id: string) => {
		return groupsDao.removeGroupById(id);
	};
	patchById = (id: string, resource: PatchGroupDto) => {
		return groupsDao.updateGroupById(id, resource);
	};

	getGroupsByUser = (userId: string, offset: number, limit: number) => {
		return groupsDao.getUserGroups(userId, offset, limit);
	};

	addPatientToGroup = (groupId: string, patientId: string) => {
		return groupsDao.addPatientToGroup(groupId, patientId);
	};

	addNurseToGroup = (groupId: string, nurseId: string) => {
		return groupsDao.addNurseToGroup(groupId, nurseId);
	};
}

export default new GroupService();
