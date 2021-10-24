import { expect } from "chai";
import { request } from "../app.test";
import {
	assistant,
	nurse,
	patient,
	TestUser,
} from "../_interface/test.user.interface";

// Test delete a user
async function testDeleteUser(user: TestUser) {
	const res = await request
		.delete(`/users/${user.id}`)
		.set({ Authorization: `Bearer ${user.accessToken}` })
		.send();
	expect(res.status).to.equal(204);
}

describe("delete users", () => {
	it("delete patient", async () => testDeleteUser(patient));
	it("delete nurse", async () => testDeleteUser(nurse));
	it("delete assistant", async () => testDeleteUser(assistant));
});
