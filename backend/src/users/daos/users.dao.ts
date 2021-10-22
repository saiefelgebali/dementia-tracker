import mongooseService from "../../common/services/mongoose.service";
import { CreateUserDto } from "../dto/create.user.dto";
import { PatchUserDto } from "../dto/patch.user.dto";
import { PutUserDto } from "../dto/put.user.dto";
import { debug } from "debug";
import shortid from "shortid";
import { PermissionFlag } from "../../common/middleware/common.permissionflag.enum";

const debugLog: debug.Debugger = debug("app:users-dao");

class UsersDao {
	private Schema = mongooseService.getMongoose().Schema;

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
