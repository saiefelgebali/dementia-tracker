import mongooseService from "../../common/services/mongoose.service";
import { CreateUserDto } from "../dto/create.user.dto";
import { PatchUserDto } from "../dto/patch.user.dto";
import { PutUserDto } from "../dto/put.user.dto";
import { debug } from "debug";
import shortid from "shortid";
import { CreateUserDataDto } from "../dto/create.user.data.dto";

const debugLog: debug.Debugger = debug("app:users-dao");

class UsersDao {
	private Schema = mongooseService.getMongoose().Schema;

	private dataSchema = new this.Schema(
		{
			_id: String,
			userId: String,
			location: String,
		},
		{ id: false, timestamps: true }
	);

	private Data = mongooseService.getMongoose().model("Data", this.dataSchema);

	private userSchema = new this.Schema(
		{
			_id: String,
			email: String,
			password: { type: String, select: false },
			firstName: String,
			lastName: String,
			permissionFlags: Number,
		},
		{ id: false }
	);

	private User = mongooseService
		.getMongoose()
		.model("Users", this.userSchema);

	constructor() {
		debugLog("Created new instance of UsersDao");
	}

	async addUser(userFields: CreateUserDto) {
		const userId = shortid.generate();
		const user = new this.User({
			_id: userId,
			...userFields,
		});
		await user.save();
		debugLog(`Created new user with id ${user._id}`);
		return user._id;
	}

	async addUserData(userId: string, dataFields: CreateUserDataDto) {
		const dataId = shortid.generate();
		const data = new this.Data({
			_id: dataId,
			userId,
			location: dataFields.location,
		});
		await data.save();
		debugLog(`Created new data for user ${userId}`);
		return data._id;
	}

	async deleteUserDataById(dataId: string) {
		return this.Data.deleteOne({ _id: dataId }).exec();
	}

	async getUserData(userId: string, offset: number, limit: number) {
		const data = this.Data.find({ userId })
			.skip(offset)
			.limit(limit)
			.exec();

		return data;
	}

	async getUsers(offset: number, limit: number) {
		return this.User.find().limit(limit).skip(offset).exec();
	}

	async getUsersByIds(userIds: string[]) {
		return this.User.find({ _id: { $in: userIds } }).exec();
	}

	async getUserById(userId: string) {
		return this.User.findOne({ _id: userId }).populate("User").exec();
	}

	async getUserByEmail(email: string) {
		return this.User.findOne({ email }).exec();
	}

	async getUserByEmailWithPassword(email: string) {
		return this.User.findOne({ email })
			.select("_id email permissionFlags +password")
			.exec();
	}

	async updateUserById(
		userId: string,
		userFields: PutUserDto | PatchUserDto
	) {
		const existingUser = await this.User.findOneAndUpdate(
			{ _id: userId },
			{ $set: userFields },
			{ new: true } // returns updated object
		).exec();

		return existingUser;
	}

	async removeUserById(userId: string) {
		return this.User.deleteOne({ _id: userId }).exec();
	}
}

export default new UsersDao();
