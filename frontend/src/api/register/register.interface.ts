export interface RegisterRequest {
	permissionFlags: 1 | 2;
	email: string;
	password: string;
}

export interface RegisterResponse {
	userId: string;
}
