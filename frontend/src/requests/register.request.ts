import { api } from "../api";

interface RegisterRequest {
	email: string;
	password: string;
	permissionFlags: number;
}

export async function fetchRegisterUser(body: RegisterRequest) {
	const res = await fetch(`${api}/users`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	return res.status;
}
