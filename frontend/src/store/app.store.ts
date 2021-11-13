import { createResource, createSignal } from "solid-js";
import { getMe } from "../api/users/get.me.request";
import { User } from "../api/users/users.interface";
import { createSignalPersist } from "../utility/local.storage.signal";

export const [accessToken, setAccessToken] = createSignalPersist("accessToken");
export const [refreshToken, setRefreshToken] =
	createSignalPersist("refreshToken");

export const [me, setMe] = createSignal<User>();
