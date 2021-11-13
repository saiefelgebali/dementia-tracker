export interface User {
	_id: string;
	email: string;
	permissionFlags: number;
}

export interface UserData {
	_id: string;
	userId: string;
	location: string;
	createdAt: string;
	updatedAt: string;
}
