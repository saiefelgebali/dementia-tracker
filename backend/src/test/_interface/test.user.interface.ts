import shortid from "shortid";

export interface TestUser {
	id: string;

	body: {
		email: string;
		password: string;
		permissionFlags: number;
		firstName: string;
		lastName: string;
	};

	data: { id: string; location: string }[];

	accessToken: string;
	refreshToken: string;
}

export const patient: TestUser = {
	id: "",
	body: {
		email: `patient+${shortid.generate()}@example.com`,
		password: "patientP@551234",
		permissionFlags: 1,
		firstName: "Johnny",
		lastName: "Doeski",
	},
	data: [],
	accessToken: "",
	refreshToken: "",
};

export const nurse: TestUser = {
	id: "",
	body: {
		email: `nurse+${shortid.generate()}@example.com`,
		password: "nurseP@ss1234",
		permissionFlags: 2,
		firstName: "Jospeh",
		lastName: "Nursing",
	},
	data: [],
	accessToken: "",
	refreshToken: "",
};

export const assistant: TestUser = {
	id: "",
	body: {
		email: `assistant+${shortid.generate()}@example.com`,
		password: "nurseP@ss1234",
		permissionFlags: 2,
		firstName: "Ayaan",
		lastName: "Mahmoud",
	},
	data: [],
	accessToken: "",
	refreshToken: "",
};
