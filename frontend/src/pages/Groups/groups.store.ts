import { createResource, createSignal } from "solid-js";
import { getGroups } from "../../api/groups/get.groups";
import { GetGroupsResponse } from "../../api/groups/groups.interface";
import { accessToken } from "../../store/app.store";

export const [loading, setLoading] = createSignal<boolean>(false);
export const [errors, setErrors] = createSignal<string[]>([]);
// export const [groups, setGroups] = createResource<GetGroupsResponse>();
