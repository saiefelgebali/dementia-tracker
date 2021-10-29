import { api } from "../api";

interface LoginRequest {
	email: string;
	password: string;
}

interface LoginResult {
	accessToken: string;
	refreshToken: string;
}

export async function fetchLoginUser(body: LoginRequest) {
	const res = await fetch(`${api}/auth`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	const loginResult = (await res.json()) as LoginResult;

	return loginResult;
}
