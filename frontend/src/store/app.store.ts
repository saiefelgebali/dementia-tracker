import { createSignalPersist } from "../utility/local.storage.signal";

export const [accessToken, setAccessToken] = createSignalPersist("accessToken");
export const [refreshToken, setRefreshToken] =
	createSignalPersist("refreshToken");
