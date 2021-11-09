import { apiRequest } from "../common/common.request";
import { APIRequest } from "../interface/api.request.type";
import { GetGroupsRequest, GetGroupsResponse } from "./groups.interface";

export const getGroups: APIRequest<GetGroupsRequest> = async (
	body,
	callbacks
) =>
	await apiRequest(
		"/groups",
		{
			method: "GET",
		},
		callbacks
	);
