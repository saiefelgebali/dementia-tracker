import { apiRequest } from "../common/common.request";
import { APIRequest } from "../interface/api.request.type";

interface CreateGroupRequest {
	name: string;
}

export const createGroup: APIRequest<CreateGroupRequest> = async (
	body,
	callbacks
) =>
	await apiRequest(
		"/groups",
		{
			method: "POST",
			body: JSON.stringify(body),
		},
		callbacks
	);
