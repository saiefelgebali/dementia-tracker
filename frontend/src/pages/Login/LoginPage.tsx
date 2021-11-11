import { Link } from "solid-app-router";
import { Component } from "solid-js";
import { APIResErrors } from "../../api/interface/api.res.errors.interface";
import { LoginResponse } from "../../api/auth/login.interface";
import { loginRequest } from "../../api/auth/login.request";
import Form from "../../components/Form/Form";
import FormErrors from "../../components/FormErrors/FormErrors";
import FormInput from "../../components/FormInput/FormInput";
import { setAccessToken, setRefreshToken } from "../../store/app.store";
import { DEBUG } from "../../utility/utility";
import { errors, loading, setErrors, setLoading } from "./login.store";
import styles from "./LoginPage.module.scss";

const LoginPage: Component = () => {
	async function onSubmit(e: Event) {
		e.preventDefault();

		// Make login request
		setLoading(true);

		// gather params
		const form = e.target as HTMLFormElement;
		const email = form.email.value;
		const password = form.password.value;

		// request callbacks
		const success = async (response: Response) => {
			const res = (await response.json()) as LoginResponse;
			// save tokens
			setAccessToken(res.accessToken);
			setRefreshToken(res.refreshToken);

			// redirect to home page
			window.location.href = "/";
		};

		const error = async (response: Response) => {
			const res = (await response.json()) as APIResErrors;
			DEBUG && console.error(res);
			setErrors(["Invalid email or password"]);
		};

		const catchError = (error: Error) => {
			setErrors([error.message]);
		};

		await loginRequest({ email, password }, { success, error, catchError });

		// stop loading
		setLoading(false);
	}

	return (
		<Form onSubmit={onSubmit}>
			<div>
				<h2>Login to your account</h2>
				<FormErrors errors={errors} />
			</div>

			<fieldset disabled={loading()}>
				<label>Email</label>
				<FormInput
					type='email'
					name='email'
					required
					placeholder='Email'
				/>
				<label>Password</label>
				<FormInput
					type='password'
					name='password'
					required
					placeholder='Password'
				/>
			</fieldset>

			<div class={styles.actions}>
				<button class='fill'>Login</button>
				<Link href='/auth/register' class='button secondary fill'>
					Create a new account
				</Link>
			</div>
		</Form>
	);
};

export default LoginPage;
