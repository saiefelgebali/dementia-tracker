import { Link } from "solid-app-router";
import { Component } from "solid-js";
import Form from "../../components/Form/Form";
import FormInput from "../../components/FormInput/FormInput";
import { loading } from "./login.store";
import styles from "./LoginPage.module.scss";

const LoginPage: Component = () => {
	function onSubmit(e: Event) {
		// Make login request
	}

	return (
		<Form onSubmit={onSubmit}>
			<div>
				<h2>Login to your account</h2>
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
