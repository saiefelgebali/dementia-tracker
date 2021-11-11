import { apiRequest } from "../common/common.request";
import { APIRequest } from "../interface/api.request.type";
import { RegisterRequest } from "./register.interface";

export const registerRequest: APIRequest<RegisterRequest> = async (
	body,
	callbacks
) =>
	apiRequest(
		"/users",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		},
		callbacks
	);
