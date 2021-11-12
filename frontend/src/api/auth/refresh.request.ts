import { apiRequestNoAuth } from "../common/common.request";
import { APIRequest } from "../interface/api.request.type";

export interface RefreshRequest {
	refreshToken: string;
}

export interface RefreshResponse {
	accessToken: string;
	refreshToken: string;
}

export const refreshRequest: APIRequest<RefreshRequest> = async (
	body,
	callbacks?
) =>
	apiRequestNoAuth(
		"/auth/refresh",
		{
			method: "POST",
			body: JSON.stringify(body),
		},
		callbacks
	);
