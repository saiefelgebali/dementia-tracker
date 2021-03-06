import mongooseService from "../../common/services/mongoose.service";

import debug from "debug";
import { CreateGroupDto } from "../dto/createGroup.dto";
import shortid from "shortid";
import { PutGroupDto } from "../dto/put.group.dto";
import { PatchGroupDto } from "../dto/patch.group.dto";

const debugLog = debug("app:groups-dao");

class GroupsDao {
	private Schema = mongooseService.getMongoose().Schema;

	private groupSchema = new this.Schema(
		{
			_id: String,
			name: String,
			nurses: [{ type: String, ref: "Users" }],
			patients: [{ type: String, ref: "Users" }],
		},
		{ id: false }
	);

	private Group = mongooseService
		.getMongoose()
		.model("Groups", this.groupSchema);

	constructor() {
		debugLog("Created new instance of GroupsDao");
	}

	async addGroup(groupFields: CreateGroupDto) {
		const groupId = shortid.generate();
		const group = new this.Group({
			_id: groupId,
			name: groupFields.name,
			nurses: [groupFields.nurseId],
			patients: [],
		});
		await group.save();
		debugLog(`Created new group with id ${group._id}`);
		return group._id;
	}

	async getGroups(offset: number, limit: number) {
		return this.Group.find().limit(limit).skip(offset).exec();
	}

	async getUserGroups(userId: string, offset: number, limit: number) {
		return this.Group.find({
			$or: [{ nurses: userId }, { users: userId }],
		})
			.limit(limit)
			.skip(offset)
			.populate("patients")
			.populate("nurses")
			.exec();
	}

	async getGroupById(groupId: string) {
		return this.Group.findOne({ _id: groupId })
			.populate("Group")
			.populate("patients")
			.populate("nurses")
			.exec();
	}

	async updateGroupById(
		groupId: string,
		groupFields: PutGroupDto | PatchGroupDto
	) {
		const existingGroup = await this.Group.findOneAndUpdate(
			{ _id: groupId },
			{ $set: groupFields },
			{ new: true } // returns updated object
		).exec();

		return existingGroup;
	}

	async addUser(
		groupId: string,
		userId: string,
		userList: "nurses" | "patients"
	) {
		const existingGroup = await this.Group.findOneAndUpdate(
			{
				_id: groupId,
			},
			{ $push: { [userList]: userId } },
			{ new: true }
		);

		return existingGroup;
	}

	async removeUser(
		groupId: string,
		userId: string,
		userList: "nurses" | "patients"
	) {
		const existingGroup = await this.Group.findOneAndUpdate(
			{
				_id: groupId,
			},
			{ $pull: { [userList]: userId } },
			{ new: true }
		);

		return existingGroup;
	}

	async removeGroupById(groupId: string) {
		return this.Group.deleteOne({ _id: groupId }).exec();
	}
}

export default new GroupsDao();
