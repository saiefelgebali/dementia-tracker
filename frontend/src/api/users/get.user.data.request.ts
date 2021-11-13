import { apiRequest } from "../common/common.request";
import { APIRequest } from "../interface/api.request.type";
import { UserData } from "./users.interface";

export interface GetUserDataRequest {
	id: string;
}

export type GetUserDataResponse = UserData[];

export const getUserDataRequest: APIRequest<GetUserDataRequest> = async (
	body,
	callbacks?
) =>
	apiRequest(
		`/users/${body.id}/data`,
		{
			method: "GET",
		},
		callbacks
	);
