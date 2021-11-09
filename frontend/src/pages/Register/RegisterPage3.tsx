import { Component, createEffect, createSignal } from "solid-js";
import { APIResErrors } from "../../api/interface/api.res.errors.interface";
import { RegisterResponse } from "../../api/register/register.interface";
import { registerRequest } from "../../api/register/register.requests";
import Form from "../../components/Form/Form";
import FormNavigation from "../../components/Form/FormNavigation";
import { FormPageProps } from "../../components/FormGroup/FormPage";
import FormInput from "../../components/FormInput/FormInput";
import {
	body,
	loading,
	setBody,
	setErrors,
	setLoading,
	validateBody,
} from "./register.store";
import styles from "./RegisterPage.module.scss";

export const RegisterPage3: Component<FormPageProps> = ({
	pageNumber,
	setCurrentPage,
}) => {
	const [password, setPassword] = createSignal<string>("");
	const [passwordConfirm, setPasswordConfirm] = createSignal<string>("");

	// update form body
	createEffect(() => {
		setBody((prev) => ({
			...prev,
			password: password(),
		}));
	});

	// validations
	function validatePasswordLength(input: HTMLInputElement) {
		if (input.value.length < 5) {
			return input.setCustomValidity(
				"Password must be at least 5 characters long."
			);
		}
		return input.setCustomValidity("");
	}
	function validatePasswordsMatch(input: HTMLInputElement) {
		if (password() !== passwordConfirm()) {
			return input.setCustomValidity("Passwords do not match");
		}
		return input.setCustomValidity("");
	}

	// handle submit
	async function onSubmit(e: Event) {
		e.preventDefault();

		// start loading
		setLoading(true);

		// validate form
		const validationErrors = validateBody();

		if (validationErrors.length > 0) {
			// show errors
			console.log(validationErrors);
		}

		// request callbacks
		const success = (res: RegisterResponse) => {
			// redirect to login
			window.location.href = "/auth/login";
		};

		const error = (res: APIResErrors) => {
			// server errors
			setErrors(
				res.errors.map(
					(e) => `${e.param || ""}${e.param ? ": " : ""}${e.msg}`
				)
			);
		};

		const catchError = (error: Error) => {
			// client error
			setErrors([error.message]);
		};

		await registerRequest(body(), {
			success,
			error,
			catchError,
		});

		// stop loading
		setLoading(false);
	}

	return (
		<Form class={styles.formPage} onSubmit={onSubmit}>
			<fieldset disabled={loading()}>
				<label>Password</label>
				<FormInput
					type='password'
					minlength={5}
					required
					placeholder='Password'
					inputValue={password}
					setInputValue={setPassword}
					customValidator={validatePasswordLength}
				/>

				<label>Confirm Password</label>
				<FormInput
					type='password'
					placeholder='Confirm Password'
					required
					inputValue={passwordConfirm}
					setInputValue={setPasswordConfirm}
					customValidator={validatePasswordsMatch}
				/>
			</fieldset>
			<FormNavigation
				class={styles.navigation}
				page={pageNumber}
				setPage={setCurrentPage}
				back
				submit
				loading={loading}
			/>
		</Form>
	);
};
