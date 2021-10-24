import { expect } from "chai";
import mongoose from "mongoose";
import app from "../app";
import supertest from "supertest";
import debug from "debug";

const debugLog = debug("test:app");

// this runs after each test
after((done) => {
	// close connection to app
	app.close(() => {
		// close database connection
		// then call done()
		mongoose.connection.close(done);
	});
});

describe("Index Test", () => {
	// Test the testing infrastructure
	debugLog("Starting index test");
	it("should always pass", () => {
		expect(true).to.equal(true);
	});
});

// API Testing Agent
export const request = supertest.agent(app);

describe.only("test app", () => {
	// order of tests
	require("./users/users.test");
	require("./groups/groups.test");
	require("./users/delete.users.test");
});
