import { Component } from "solid-js";
import MultiPageForm from "../../components/MultiPageForm/MultiPageForm";
import styles from "./RegisterPage.module.scss";

const Page1 = () => {
	return (
		<div className={styles.page}>
			<h1>Account Type</h1>
			<p>What type of account are you creating?</p>
			<div class={styles.select}>
				<button>Patient</button>
				<button>Nurse</button>
			</div>
		</div>
	);
};

const Page2 = () => {
	return (
		<div className={styles.page}>
			<h1>Personal Information</h1>
			<label>Email</label>
			<input type='email' required placeholder='someone@example.com' />
		</div>
	);
};

const Page3 = () => {
	return (
		<div className={styles.page}>
			<h1>Password</h1>
			<label>Password</label>
			<input
				type='password'
				minLength={5}
				required
				placeholder='Password'
			/>
			<label>Confirm</label>
			<input
				type='password'
				minLength={5}
				required
				placeholder='Confirm Password'
				oninput={(e) => {
					if (
						(e.currentTarget as HTMLInputElement).value !==
						(
							e.currentTarget
								.previousElementSibling as HTMLInputElement
						).value
					) {
						(e.currentTarget as HTMLInputElement).setCustomValidity(
							"Passwords don't match"
						);
					}
				}}
			/>
		</div>
	);
};

const RegisterPage: Component = () => {
	const pages = [Page1, Page2, Page3];

	function onSubmit(e: Event) {
		e.preventDefault();
		const form = e.currentTarget as HTMLFormElement;
	}

	return <MultiPageForm onSubmit={onSubmit} pages={pages} />;
};

export default RegisterPage;
