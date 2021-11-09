import { api } from "../api";
import { apiRequest } from "../common/common.request";
import { APIRequest } from "../interface/api.request.type";
import { RegisterRequest, RegisterResponse } from "./register.interface";

export const registerRequest: APIRequest<RegisterRequest, RegisterResponse> =
	async (body, callbacks) =>
		apiRequest(
			`${api}/users`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			},
			callbacks
		);
