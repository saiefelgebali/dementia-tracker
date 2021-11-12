import { apiRequest } from "../common/common.request";
import { APIRequest } from "../interface/api.request.type";

export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	accessToken: string;
	refreshToken: string;
}

export const loginRequest: APIRequest<LoginRequest> = async (
	body,
	callbacks?
) =>
	apiRequest(
		"/auth",
		{
			method: "POST",
			body: JSON.stringify(body),
		},
		callbacks
	);
