import { apiRequest } from "../common/common.request";
import { APIRequest } from "../interface/api.request.type";

export const getGroup: APIRequest<{ id: string }> = async ({ id }, callbacks) =>
	await apiRequest(
		`/groups/${id}`,
		{
			method: "GET",
		},
		callbacks
	);
