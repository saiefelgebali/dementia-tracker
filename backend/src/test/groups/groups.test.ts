import { expect } from "chai";
import { request } from "../app.test";
import { TestUser } from "../_interface/test.user.interface";

const group = {
	id: "",
	body: {
		name: "Group One",
	},
};

async function testCreateGroup(user: TestUser) {
	// create group and return group id
	const res = await request
		.post("/groups")
		.set({ Authorization: `Bearer ${user.accessToken}` })
		.send(group.body);
	expect(res.status).to.equal(201);
	expect(res.body).to.not.be.empty;
	expect(res.body).to.be.an("object");
	expect(res.body.id).to.be.a("string");
	group.id = res.body.id;
}

describe("test nurse endpoints", () => {
	it("create group", async () => {});

	describe("with new group", () => {
		it("add nurse to group", () => {});

		it("add patient to group", () => {});

		it("remove patient from group", () => {});

		it("leave group", () => {});
	});
});
