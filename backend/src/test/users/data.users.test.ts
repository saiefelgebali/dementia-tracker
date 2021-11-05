import { expect } from "chai";
import {
	TestUser,
	patient,
	nurse,
	assistant,
} from "../_interface/test.user.interface";
import { request } from "../app.test";

// Test create data
async function testCreateData(user: TestUser, location: string) {
	const res = await request
		.post(`/users/${user.id}/data`)
		.set({ Authorization: `Bearer ${user.accessToken}` })
		.send({ location });
	expect(res.status).to.equal(201);
	expect(res.body).to.not.be.empty;
	expect(res.body).to.be.an("object");
	expect(res.body.id).to.be.a("string");
	user.data.push({ id: res.body.id, location });
}

// debug get
describe("add mock data", () => {
	it("a) add data to user", async () => testCreateData(patient, "192 168"));
	it("b) add data to user", async () => testCreateData(patient, "321 456"));
});

describe("test user data", () => {
	it("get user data", async () => {
		const res = await request
			.get(`/users/${patient.id}/data`)
			.set({ Authorization: `Bearer ${patient.accessToken}` })
			.send();
		expect(res.status).to.equal(200);
		expect(res.body).to.not.be.empty;
		expect(res.body).to.be.an("array");
		expect(res.body.map((o: any) => o._id)).to.deep.equal(
			patient.data.map((o) => o.id)
		);
	});
});
