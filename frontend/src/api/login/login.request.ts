import { api } from "../api";
import { LoginRequest } from "./login.interface";

export const loginRequest = async (body: LoginRequest) =>
	fetch(`${api}/auth`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
