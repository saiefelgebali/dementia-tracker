import mongoose, { MongooseOptions } from "mongoose";
import { debug } from "debug";

const debugLog = debug("app:mongoose-service");

class MongooseService {
	private connectionAttemptNumber = 0;

	private mongooseOptions: MongooseOptions = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	};

	constructor() {
		this.connectWithRetry();
	}

	getMongoose() {
		return mongoose;
	}

	/**
	 * Attempt to establish a connection to MongoDB database.
	 * Retry if conncection attempt is unsuccessful.
	 */
	connectWithRetry = async () => {
		debugLog("Attempting MongoDB connection");
		try {
			await mongoose.connect(
				"mongodb://localhost:27017/api-db",
				this.mongooseOptions
			);
			debugLog("Established connection to MongoDB database sucessfully.");
		} catch (error) {
			const retrySeconds = 5;
			debugLog(
				`MongoDB connection attempt #${this
					.connectionAttemptNumber++} unsucessful. Retry in ${retrySeconds}s`
			);
			setTimeout(this.connectWithRetry, retrySeconds * 1000);
		}
	};
}

export default new MongooseService();
