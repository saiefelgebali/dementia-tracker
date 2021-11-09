import { APIRequestCallbacks } from "../common/common.request";

export type APIRequest<Req> = (
	body: Req,
	callbacks?: Partial<APIRequestCallbacks>
) => Promise<Response | null>;
