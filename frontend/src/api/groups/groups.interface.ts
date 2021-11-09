export interface Group {
	_id: string;
	name: string;
	nurses: string[];
	patients: string[];
}

export interface GetGroupsRequest {
	offset?: number;
	limit?: number;
}

export type GetGroupsResponse = Group[];
