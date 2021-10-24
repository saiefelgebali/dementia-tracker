import { expect } from "chai";
import { request } from "../app.test";
import { TestGroup } from "../_interface/test.group.interface";
import {
	assistant,
	nurse,
	patient,
	TestUser,
} from "../_interface/test.user.interface";

const group: TestGroup = {
	id: "",
	body: {
		name: "Group One",
		nurses: [],
		patients: [],
	},
};

async function testCreateGroup(user: TestUser, auth: boolean) {
	// create group and return group id
	const res = await request
		.post("/groups")
		.set({ Authorization: `Bearer ${user.accessToken}` })
		.send(group.body);
	expect(res.status).to.equal(auth ? 201 : 403);
	if (auth) {
		expect(res.body).to.not.be.empty;
		expect(res.body).to.be.an("object");
		expect(res.body.id).to.be.a("string");
		group.id = res.body.id;
	}
}

describe("test group endpoints", () => {
	it("create group", async () => {
		// create group and return group id
		const res = await request
			.post("/groups")
			.set({ Authorization: `Bearer ${nurse.accessToken}` })
			.send(group.body);
		expect(res.status).to.equal(201);
		expect(res.body).to.not.be.empty;
		expect(res.body).to.be.an("object");
		expect(res.body.id).to.be.a("string");
		group.id = res.body.id;
		group.body.nurses.push(nurse.id);
	});

	it("disallow patient creating a group", async () => {
		const res = await request
			.post("/groups")
			.set({ Authorization: `Bearer ${patient.accessToken}` })
			.send(group.body);
		expect(res.status).to.equal(403);
	});

	describe("with new group", () => {
		it("add nurse to group", async () => {
			const res = await request
				.post(`/groups/${group.id}/nurses/${assistant.id}`)
				.set({ Authorization: `Bearer ${nurse.accessToken}` })
				.send();

			expect(res.status).to.equal(204);
			expect(res.body).to.be.empty;
			group.body.nurses.push(assistant.id);
		});

		it("add patient to group", async () => {
			const res = await request
				.post(`/groups/${group.id}/patients/${patient.id}`)
				.set({ Authorization: `Bearer ${nurse.accessToken}` })
				.send();

			expect(res.status).to.equal(204);
			expect(res.body).to.be.empty;
			group.body.patients.push(patient.id);
		});

		it("list nurse groups", async () => {
			const res = await request
				.get(`/groups`)
				.set({ Authorization: `Bearer ${nurse.accessToken}` })
				.send();
			expect(res.status).to.equal(200);
			expect(res.body).to.not.be.empty;
			expect(res.body).to.be.an("Array");
			expect(res.body.length).to.be.equal(1);
			expect(res.body[0].id).to.be.equal(group.id);
		});

		it("get group as nurse", async () => {
			const res = await request
				.get(`/groups/${group.id}`)
				.set({ Authorization: `Bearer ${nurse.accessToken}` })
				.send();

			expect(res.status).to.equal(200);
			expect(res.body).to.be.an("object");
			expect(res.body.name).to.be.equal(group.body.name);
			expect(res.body.nurses).to.be.deep.equal(group.body.nurses);
			expect(res.body.patients).to.be.deep.equal(group.body.patients);
		});

		it("remove patient from group", async () => {
			const res = await request
				.delete(`/groups/${group.id}/patients/${patient.id}`)
				.set({ Authorization: `Bearer ${nurse.accessToken}` })
				.send();

			expect(res.status).to.equal(204);
			expect(res.body).to.be.empty;
			group.body.patients = group.body.patients.filter(
				(id) => id !== patient.id
			);
		});

		it("remove nurse from group", async () => {
			const res = await request
				.delete(`/groups/${group.id}/nurses/${assistant.id}`)
				.set({ Authorization: `Bearer ${nurse.accessToken}` })
				.send();

			expect(res.status).to.equal(204);
			expect(res.body).to.be.empty;
			group.body.nurses = group.body.nurses.filter(
				(id) => id !== assistant.id
			);
		});

		it("leave group", () => {});
	});
});
