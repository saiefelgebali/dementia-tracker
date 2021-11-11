import { createSignal } from "solid-js";
import { RegisterRequest } from "../../api/users/register.interface";

// state
export const [body, setBody] = createSignal<RegisterRequest>({
	permissionFlags: 1,
	email: "",
	password: "",
});

export const [loading, setLoading] = createSignal(false);

export const [errors, setErrors] = createSignal<string[]>([]);

// validation
export function validateBody(): string[] {
	let errors: string[] = [];

	// validate form body
	if (!body().permissionFlags) {
	}
	if (!body().email) {
	}
	if (!body().password) {
	}

	return errors;
}
