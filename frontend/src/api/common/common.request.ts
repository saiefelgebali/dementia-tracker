import { APIResErrors } from "../interface/api.res.errors.interface";

export type SuccessCallback<R> = (res: R) => void;
export type ErrorCallback = (res: APIResErrors) => void;
export type CatchCallback = (err: Error) => void;

export interface APIRequestCallbacks<R> {
	success: SuccessCallback<R>;
	error: ErrorCallback;
	catchError: CatchCallback;
}

export async function apiRequest<R>(
	url: RequestInfo,
	init: RequestInit,
	callbacks?: APIRequestCallbacks<R>
) {
	// try request
	try {
		// fetch request
		const response = await fetch(url, {
			...init,
			headers: {
				"Content-Type": "application/json",
				...init.headers,
			},
		});
		const res = await response.json();

		// error from server
		if (response.status > 299) {
			callbacks?.error && callbacks.error(res as APIResErrors);
		}

		// successful request
		else if (response.status <= 299) {
			callbacks?.success && callbacks.success(res as R);
		}

		return res;
	} catch (error) {
		// error making request
		callbacks?.catchError && callbacks.catchError(error as Error);

		return null;
	}
}
