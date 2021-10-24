import { expect } from "chai";

import debug from "debug";
import mongoose from "mongoose";
import app from "../app";

const debugLog = debug("test:app");

// // this runs before each test
// before(() => {
// 	// connect testing agent to app
// 	request = supertest.agent(app);
// });

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
