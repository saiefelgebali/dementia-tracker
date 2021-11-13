import { apiRequest } from "../common/common.request";
import { APIRequest } from "../interface/api.request.type";

export interface DeleteUserDataRequest {
	id: string;
	dataId: string;
}

export const deleteUserDataRequest: APIRequest<DeleteUserDataRequest> = async (
	body,
	callbacks?
) =>
	apiRequest(
		`/users/${body.id}/data/${body.dataId}`,
		{
			method: "DELETE",
		},
		callbacks
	);
