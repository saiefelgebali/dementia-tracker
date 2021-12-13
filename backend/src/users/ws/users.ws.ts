import { Server, Socket } from "socket.io";
import http from "http";
import { debug } from "debug";

const debugLog = debug("app:users");

class UsersWs {
	private users: Map<string, Socket> = new Map();

	constructor() {
		debugLog("Created a new instance of UsersWs");
	}

	public startServer(httpServer: http.Server) {
		const wsServer = new Server(httpServer, {
			cors: { origin: "*", methods: ["GET", "POST"] },
		});

		this.setupServer(wsServer);
	}

	private setupServer(wsServer: Server) {
		wsServer.on("connection", (socket) => {
			let userId: string;

			// Save user on connect
			socket.on("welcome", (id) => {
				userId = id;
				this.users.set(id, socket);
				debugLog(`user ${id} connected`);
			});

			// Update user data
			socket.on("data", (data) => {
				debugLog(`${userId} data`, data);
			});

			// remove user on disconnect
			socket.on("disconnect", () => {
				this.users.delete(userId);
				debugLog(`user ${userId} disconnected`);
			});
		});

		debugLog("Setup users socket server");
	}

	public notifyAddData(userId: string, data: any) {
		const socket = this.users.get(userId);

		if (!socket) return;

		socket.emit("data", data);
	}
}

export default new UsersWs();
