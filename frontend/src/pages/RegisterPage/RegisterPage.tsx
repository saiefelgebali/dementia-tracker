import { Component, createEffect } from "solid-js";
import Form, { PageGroup } from "../../components/Form/Form";
import { fetchLoginUser } from "../../requests/login.request";
import { fetchRegisterUser } from "../../requests/register.request";
import RegisterInputPage_1 from "./RegisterInputPage_1";
import RegisterInputPage_2 from "./RegisterInputPage_2";
import RegisterInputPage_3 from "./RegisterInputPage_3";
import {
	accountType,
	email,
	page,
	password,
	setPage,
} from "./RegisterPage.state";

const RegisterPage: Component = () => {
	// Functions
	async function onSubmit(e: Event) {
		e.preventDefault();

		const permissionFlags = (() => {
			switch (accountType()) {
				case "patient":
					return 1;
				case "nurse":
					return 2;
				default:
					return 1;
			}
		})();

		await fetchRegisterUser({
			email: email(),
			password: password(),
			permissionFlags,
		});

		console.log({
			email: email(),
			password: password(),
			permissionFlags,
		});

		// temp
		const res = await fetchLoginUser({
			email: email(),
			password: password(),
		});
		console.log(res);
	}

	// Combine pages
	const pages = [
		RegisterInputPage_1,
		RegisterInputPage_2,
		RegisterInputPage_3,
	];
	() => {
		switch (accountType()) {
			case "nurse":
				return 1;
			case "patient":
				return 2;
		}
	};
	return (
		<Form onSubmit={onSubmit}>
			<h1>
				Create a new <span class='primary'>{accountType()}</span>{" "}
				account
			</h1>
			<PageGroup pages={pages} current={page} setCurrent={setPage} />
		</Form>
	);
};

export default RegisterPage;
