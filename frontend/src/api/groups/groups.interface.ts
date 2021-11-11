import { User } from "../users/users.interface";

export interface Group {
	_id: string;
	name: string;
	nurses: User[];
	patients: User[];
}

export interface GetGroupsRequest {
	offset?: number;
	limit?: number;
}

export type GetGroupsResponse = Group[];
