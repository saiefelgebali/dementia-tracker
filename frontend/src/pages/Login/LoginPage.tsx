import { Link } from "solid-app-router";
import { Component } from "solid-js";
import { ResponseErrors } from "../../api/interface/error";
import { loginRequest } from "../../api/login/login.request";
import Form from "../../components/Form/Form";
import FormErrors from "../../components/FormErrors/FormErrors";
import FormInput from "../../components/FormInput/FormInput";
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
		const email = form.email;
		const password = form.password;

		// try request
		try {
			const response = await loginRequest({ email, password });

			// error logging in
			if (response.status !== 201) {
				const res = (await response.json()) as ResponseErrors;
				DEBUG && console.error(res);
				setErrors(["Invalid email or password"]);
			}

			// successful request
			else if (response.status === 201) {
				// redirect to home page
				window.location.href = "/";
			}
		} catch (error) {
			// client error
			setErrors([(error as Error).message]);
		}

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
				<FormInput type='email' required placeholder='Email' />
				<label>Password</label>
				<FormInput type='password' required placeholder='Password' />
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
