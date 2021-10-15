export interface CreateUserDto {
	email: string;
	password: string;
	permissionFlags: number;
	firstName?: string;
	lastName?: string;
}
