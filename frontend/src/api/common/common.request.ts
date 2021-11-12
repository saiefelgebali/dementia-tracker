import {
	accessToken,
	refreshToken,
	setAccessToken,
} from "../../store/app.store";
import { DEBUG } from "../../utility/utility";
import { api } from "../api";
import { refreshRequest, RefreshResponse } from "../auth/refresh.request";

export type SuccessCallback = (res: Response) => void;
export type ErrorCallback = (response: Response) => void;
export type CatchCallback = (err: Error) => void;

export interface APIRequestCallbacks {
	success: SuccessCallback;
	error: ErrorCallback;
	catchError: CatchCallback;
}

export async function apiRequestNoAuth(
	path: string,
	init: RequestInit,
	callbacks?: Partial<APIRequestCallbacks>
) {
	// try request
	try {
		DEBUG && console.log("Fetching from ", path);
		// fetch request
		const res = await fetch(`${api}${path}`, {
			...init,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken()}`,
				...init.headers,
			},
		});

		// error from server
		if (res.status > 299) {
			callbacks?.error && callbacks.error(res);
		}

		// successful request
		else if (res.status <= 299) {
			callbacks?.success && callbacks.success(res);
		}

		return res;
	} catch (error) {
		// error making request
		callbacks?.catchError && callbacks.catchError(error as Error);

		return null;
	}
}

export async function apiRequest(
	path: string,
	init: RequestInit,
	callbacks?: Partial<APIRequestCallbacks>
): Promise<Response | null> {
	// make request
	const res = await apiRequestNoAuth(path, init, callbacks);

	// unauthorized
	if (res && res.status === 403) {
		// use stored refresh token
		const token = refreshToken();
		if (token) {
			function refreshFailed() {
				// window.location.href = "/auth/login";
			}

			console.log(refreshToken());

			// make refresh request
			await refreshRequest(
				{
					refreshToken: token,
				},
				{
					success: async (res) => {
						// refresh accessToken
						const refreshRes =
							(await res.json()) as RefreshResponse;
						setAccessToken(refreshRes.accessToken);

						// make request again
						apiRequestNoAuth(path, init, callbacks);
					},
					error: refreshFailed,
					catchError: refreshFailed,
				}
			);
		}

		// otherwise, redirect to login
		else {
			// window.location.href = "/auth/login";
		}
	}

	return res;
}
