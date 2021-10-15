import { Application } from "express";

export abstract class CommonRoutesConfig {
	protected app: Application;
	protected name: string;

	constructor(app: Application, name: string) {
		this.app = app;
		this.name = name;
		this.configureRoutes();
	}

	public getName() {
		return this.name;
	}

	protected abstract configureRoutes(): Application;
}
