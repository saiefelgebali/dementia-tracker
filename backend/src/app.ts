import express from "express";
import http from "http";
import cors from "cors";
import debug from "debug";
import helmet from "helmet";
import { CommonRoutesConfig } from "./common/common.routes.config";
import { UserRoutes } from "./users/users.routes.config";
import { AuthRoutes } from "./auth/auth.routes.config";
import { print } from "./util/console";
import { logger } from "./util/logger";
import { GroupRoutes } from "./groups/groups.routes.config";
import UsersWs from "./users/ws/users.ws";

const app = express();
const server = http.createServer(app);
const port = 5000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug("app");

// use helmet to take care of basic security measures
app.use(helmet());

// parse all incoming requests into JSON
app.use(express.json());

// allow cross-origin requests
app.use(cors());

// log requests if not testing
if (process.env.NODE_ENV !== "test") app.use(logger);

// instantiate routes objects
// thereby adding endpoints to our app
routes.push(new AuthRoutes(app));
routes.push(new UserRoutes(app));
routes.push(new GroupRoutes(app));

// use socket servers
UsersWs.startServer(server);

// simple running message to make sure everything is working properly
const runningMessage = `Server running at http://localhost:${port}`;

app.get("/", (req, res) => {
	res.status(200).send(runningMessage);
});

// start server
export default server.listen(port, () => {
	routes.forEach((route) => {
		debugLog(`Routes configured for ${route.getName()}`);
	});
	print(runningMessage, {
		tag: "SERVER",
		tagStyle: "FgGreen",
	});
});
