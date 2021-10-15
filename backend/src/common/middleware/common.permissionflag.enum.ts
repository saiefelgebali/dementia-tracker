/**
 * @description
 * Each permission will be defined as a power of 2.
 * This allows us to leverage JavaScript's biwise AND operator (&).
 *
 * @eg User with permission 3 trying to access permission flag 1.
 * @example 5 & 1 = 1
 * @eg User with permission 1 trying to access permission flag 4
 * @example 1 & 4 = 0
 * @note
 * 1 + 2 = 3, therefore permissionFlag 5 will have permissions to only 1 and 2.
 * @note
 * 1 + 4 = 5, therefore permissionFlag 5 will have permissions to only 1 and 4.
 * @note
 * The maximum safe-value for a 32-bit integer is 2147483647,
 * therefore this represents a sudo admin's permission level
 */
export enum PermissionFlag {
	PATIENT_PERMISSION = 1,
	NURSE_PERMISSION = 2,
	ADMIN_PERMISSION = 8,
	ALL_PERMISSIONS = 2147483647,
}
