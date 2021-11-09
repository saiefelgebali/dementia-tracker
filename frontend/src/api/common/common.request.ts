import { accessToken } from "../../store/app.store";
import { DEBUG } from "../../utility/utility";
import { api } from "../api";

export type SuccessCallback = (res: Response) => void;
export type ErrorCallback = (response: Response) => void;
export type CatchCallback = (err: Error) => void;

export interface APIRequestCallbacks {
	success: SuccessCallback;
	error: ErrorCallback;
	catchError: CatchCallback;
}

export async function apiRequest(
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
