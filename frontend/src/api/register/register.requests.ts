import { api } from "../api";
import { RegisterRequest } from "./register.interface";

export const registerRequest = async (body: RegisterRequest) =>
	fetch(`${api}/users`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
