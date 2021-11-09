import { APIRequestCallbacks } from "../common/common.request";

export type APIRequest<Req, Res> = (
	body: Req,
	callbacks?: APIRequestCallbacks<Res>
) => Promise<Res>;
