import { apiRequest } from "../common/common.request";
import { APIRequest } from "../interface/api.request.type";

interface AddPatientRequest {
	groupId: string;
	email: string;
}

export const postGroupPatient: APIRequest<AddPatientRequest> = async (
	body,
	callbacks
) => {
	return await apiRequest(
		`/groups/${body.groupId}/patients`,
		{
			method: "POST",
			body: JSON.stringify({ email: body.email }),
		},
		callbacks
	);
};
