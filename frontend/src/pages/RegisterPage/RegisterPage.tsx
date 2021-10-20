import { Component, createEffect } from "solid-js";
import Form, { PageGroup } from "../../components/Form/Form";
import RegisterInputPage_1 from "./RegisterInputPage_1";
import RegisterInputPage_2 from "./RegisterInputPage_2";
import RegisterInputPage_3 from "./RegisterInputPage_3";
import { accountType, page, ref, setPage } from "./_shared";

const RegisterPage: Component = () => {
	// Functions
	function onSubmit(e: Event) {
		e.preventDefault();
		console.log("submit");
	}

	// Combine pages
	const pages = [
		RegisterInputPage_1,
		RegisterInputPage_2,
		RegisterInputPage_3,
	];

	// Effects
	createEffect(() => {
		if (!page() || ref()) return;

		console.log(ref()?.clientHeight);
	});

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
