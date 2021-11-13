import { apiRequest } from "../common/common.request";
import { APIRequest } from "../interface/api.request.type";

export interface GetUserRequest {
	id: string;
}

export interface GetUserResponse {
	accessToken: string;
	refreshToken: string;
}

export const getUserRequest: APIRequest<GetUserRequest> = async (
	body,
	callbacks?
) =>
	apiRequest(
		`/users/${body.id}`,
		{
			method: "GET",
		},
		callbacks
	);
