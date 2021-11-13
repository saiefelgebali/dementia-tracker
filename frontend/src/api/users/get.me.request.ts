import { apiRequest } from "../common/common.request";
import { APIRequest } from "../interface/api.request.type";

export const getMe: APIRequest<{ accessToken: string }> = async (
	body,
	callbacks?
) =>
	apiRequest(
		`/users/me`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${body.accessToken}`,
			},
		},
		callbacks
	);
