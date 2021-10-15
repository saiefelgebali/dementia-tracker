import app from "../../app";
import supertest from "supertest";
import { expect } from "chai";
import shortid from "shortid";
import mongoose from "mongoose";

let firstUserIdTest = ""; // will later hold a value returned by our API

const firstUserBody = {
	email: `john.doe+${shortid.generate()}@toptal.com`,
	password: "p@55w0rd123",
};

let accessToken = "";
let refreshToken = "";
const newFirstName = "John";
const newFirstName2 = "Youssef";
const newLastName = "Doe";
const newLastName2 = "David";

describe("users and auth endpoints", () => {
	// api testing agent
	let request: supertest.SuperAgentTest;

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

	/**
	 * End to end API testing
	 */

	it("should allow a POST to /users", async () => {
		const res = await request.post("/users").send(firstUserBody);
		expect(res.status).to.equal(201);
		expect(res.body).to.not.be.empty;
		expect(res.body).to.be.an("object");
		expect(res.body.id).to.be.a("string");
		firstUserIdTest = res.body.id;
	});

	it("should allow a POST to /auth", async () => {
		const res = await request.post("/auth").send(firstUserBody);
		expect(res.status).to.be.equal(201);
		expect(res.body).to.not.be.empty;
		expect(res.body).to.be.an("object");
		expect(res.body.accessToken).to.be.a("string");
		expect(res.body.refreshToken).to.be.a("string");
		accessToken = res.body.accessToken;
		refreshToken = res.body.refreshToken;
	});

	it("should allow a GET from /users/:userId with an access token", async () => {
		const res = await request
			.get(`/users/${firstUserIdTest}`)
			.set({ Authorization: `Bearer ${accessToken}` })
			.send();
		expect(res.status).to.equal(200);
		expect(res.body).to.not.be.empty;
		expect(res.body).to.be.an("object");
		expect(res.body._id).to.be.a("string");
		expect(res.body._id).to.equal(firstUserIdTest);
		expect(res.body.email).to.equal(firstUserBody.email);
	});

	describe("with a valid access token", () => {
		it("should allow GET from /users", async () => {
			const res = await request
				.get("/users")
				.set({ Authorization: `Bearer ${accessToken}` })
				.send();
			expect(res.status).to.equal(403);
		});

		it("should allow a PATCH to /user/:userId with a valid ID", async () => {
			const res = await request
				.patch(`/users/${firstUserIdTest}`)
				.set({ Authorization: `Bearer ${accessToken}` })
				.send({ firstName: newFirstName });
			expect(res.status).to.equal(204);
		});

		it("should disallow a PUT  to /users/:userId trying to change permission flags", async () => {
			const res = await request
				.put(`/users/${firstUserIdTest}`)
				.set({ Authorization: `Bearer ${accessToken}` })
				.send({
					email: firstUserBody.email,
					password: firstUserBody.password,
					firstName: newFirstName,
					lastName: newLastName,
					permissionFlags: 256,
				});
			expect(res.status).to.equal(400);
		});

		it("should allow a PUT to /users/:userId/permissionFlags/2 for testing", async () => {
			const res = await request
				.put(`/users/${firstUserIdTest}/permissionFlags/2`)
				.set({ Authorization: `Bearer ${accessToken}` })
				.send({});
			console.log(res.body);
			expect(res.status).to.equal(204);
		});

		describe("with a new set of permission flags", () => {
			it("should allow a POST to /auth/refresh", async () => {
				const res = await request
					.post(`/auth/refresh`)
					.set({ Authorization: `Bearer ${accessToken}` })
					.send({ refreshToken });
				expect(res.status).to.equal(201);
				expect(res.body).to.not.be.empty;
				expect(res.body).to.be.an("object");
				expect(res.body.accessToken).to.be.a("string");
				expect(res.body.refreshToken).to.be.a("string");
				accessToken = res.body.accessToken;
				refreshToken = res.body.refreshToken;
			});

			it("should allow a PUT to /users/:userId to change first and last names", async () => {
				const res = await request
					.put(`/users/${firstUserIdTest}`)
					.set({ Authorization: `Bearer ${accessToken}` })
					.send({
						email: firstUserBody.email,
						password: firstUserBody.password,
						firstName: newFirstName2,
						lastName: newLastName2,
						permissionFlags: 1,
					});
				expect(res.status).to.equal(204);
			});

			it("should allow a GET from /users/:userId and should have a new full name", async () => {
				const res = await request
					.get(`/users/${firstUserIdTest}`)
					.set({ Authorization: `Bearer ${accessToken}` })
					.send();
				expect(res.status).to.equal(200);
				expect(res.body).to.not.be.empty;
				expect(res.body).to.be.an("object");
				expect(res.body._id).to.be.a("string");
				expect(res.body.firstName).to.equal(newFirstName2);
				expect(res.body.lastName).to.equal(newLastName2);
				expect(res.body.email).to.equal(firstUserBody.email);
				expect(res.body._id).to.equal(firstUserIdTest);
			});

			it("should allow a DELETE from /users/:userId", async () => {
				const res = await request
					.delete(`/users/${firstUserIdTest}`)
					.set({ Authorization: `Bearer ${accessToken}` })
					.send();
				expect(res.status).to.equal(204);
			});
		});
	});
});
