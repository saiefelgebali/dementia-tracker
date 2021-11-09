import { api } from "../api";
import { apiRequest } from "../common/common.request";
import { APIRequest } from "../interface/api.request.type";
import { LoginRequest, LoginResponse } from "./login.interface";

export const loginRequest: APIRequest<LoginRequest> = async (
	body,
	callbacks?
) =>
	apiRequest(
		"/auth",
		{
			method: "POST",
			body: JSON.stringify(body),
		},
		callbacks
	);
