import { expect } from "chai";
import supertest, { SuperAgentTest } from "supertest";
import mongoose from "mongoose";
import app from "../../app";

describe("test nurse endpoints", () => {
	// api testing agent
	let request: SuperAgentTest;

	// this runs before each test
	before(() => {
		// connect testing agent to app
		request = supertest.agent(app);
	});

	// this runs after each test
	after((done) => {
		// close connection to app
		app.close(() => {
			// close database connection
			// then call done()
			mongoose.connection.close(done);
		});
	});

	it("create group", async () => {
		// create group and return group id
	});

	describe("with new group", () => {
		it("add nurse to group", async () => {});

		it("add patient to group", async () => {});

		it("remove patient from group", async () => {});

		it("leave group", async () => {});
	});
});
