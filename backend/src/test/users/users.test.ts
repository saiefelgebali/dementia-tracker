import { expect } from "chai";
import {
	TestUser,
	patient,
	nurse,
	assistant,
} from "../_interface/test.user.interface";
import { request } from "../app.test";

// Test create a user
async function testCreateUser(user: TestUser) {
	const res = await request.post("/users").send(user.body);
	expect(res.status).to.equal(201);
	expect(res.body).to.not.be.empty;
	expect(res.body).to.be.an("object");
	expect(res.body.id).to.be.a("string");
	user.id = res.body.id;
}

// Test login a user
async function testLoginUser(user: TestUser) {
	const res = await request.post("/auth").send(user.body);
	// Validate response
	expect(res.status).to.be.equal(201);
	expect(res.body).to.not.be.empty;
	expect(res.body).to.be.an("object");
	expect(res.body.accessToken).to.be.a("string");
	expect(res.body.refreshToken).to.be.a("string");
	// Apply tokens to object
	user.accessToken = res.body.accessToken;
	user.refreshToken = res.body.refreshToken;
}

// Test delete a user
async function testDeleteUser(user: TestUser) {
	const res = await request
		.delete(`/users/${user.id}`)
		.set({ Authorization: `Bearer ${user.accessToken}` })
		.send();
	expect(res.status).to.equal(204);
}

describe("test user endpoints", () => {
	/**
	 * End to end API testing
	 */
	describe("create users", () => {
		it("create patient", async () => testCreateUser(patient));
		it("create nurse", async () => testCreateUser(nurse));
		it("create assistant", async () => testCreateUser(assistant));
	});

	describe("login users", () => {
		it("login patient", async () => testLoginUser(patient));
		it("login nurse", async () => testLoginUser(nurse));
		it("login assistant", async () => testLoginUser(assistant));
	});

	describe("with a valid access token", () => {
		it("get user", async () => {
			const res = await request
				.get(`/users/${patient.id}`)
				.set({ Authorization: `Bearer ${patient.accessToken}` })
				.send();
			expect(res.status).to.equal(200);
			expect(res.body).to.not.be.empty;
			expect(res.body).to.be.an("object");
			expect(res.body._id).to.be.a("string");
			expect(res.body._id).to.equal(patient.id);
			expect(res.body.email).to.equal(patient.body.email);
		});

		it("patch user with new name", async () => {
			patient.body.firstName = "Samuel";
			patient.body.lastName = "Jackson";
			const res = await request
				.patch(`/users/${patient.id}`)
				.set({ Authorization: `Bearer ${patient.accessToken}` })
				.send({
					firstName: patient.body.firstName,
					lastName: patient.body.lastName,
				});
			expect(res.status).to.equal(204);
		});

		it("get user with new name", async () => {
			const res = await request
				.get(`/users/${patient.id}`)
				.set({ Authorization: `Bearer ${patient.accessToken}` })
				.send();
			expect(res.status).to.equal(200);
			expect(res.body).to.not.be.empty;
			expect(res.body).to.be.an("object");
			expect(res.body._id).to.be.a("string");
			expect(res.body.firstName).to.equal(patient.body.firstName);
			expect(res.body.lastName).to.equal(patient.body.lastName);
			expect(res.body.email).to.equal(patient.body.email);
			expect(res.body._id).to.equal(patient.id);
		});

		it("disallow changing permission flags", async () => {
			const res = await request
				.put(`/users/${patient.id}`)
				.set({ Authorization: `Bearer ${patient.accessToken}` })
				.send({
					...patient.body,
					permissionFlags: 256,
				});
			expect(res.status).to.equal(400);
		});

		it("refresh login", async () => {
			const res = await request
				.post(`/auth/refresh`)
				.set({ Authorization: `Bearer ${patient.accessToken}` })
				.send({ refreshToken: patient.refreshToken });
			expect(res.status).to.equal(201);
			expect(res.body).to.not.be.empty;
			expect(res.body).to.be.an("object");
			expect(res.body.accessToken).to.be.a("string");
			expect(res.body.refreshToken).to.be.a("string");
			patient.accessToken = res.body.accessToken;
			patient.refreshToken = res.body.refreshToken;
		});

		it("get user with new token", async () => {
			const res = await request
				.get(`/users/${patient.id}`)
				.set({ Authorization: `Bearer ${patient.accessToken}` })
				.send();
			expect(res.status).to.equal(200);
			expect(res.body).to.not.be.empty;
			expect(res.body).to.be.an("object");
			expect(res.body._id).to.be.a("string");
			expect(res.body._id).to.equal(patient.id);
			expect(res.body.email).to.equal(patient.body.email);
		});
	});

	describe("delete users", () => {
		it("delete patient", async () => testDeleteUser(patient));
		it("delete nurse", async () => testDeleteUser(nurse));
		it("delete assistant", async () => testDeleteUser(assistant));
	});
});
