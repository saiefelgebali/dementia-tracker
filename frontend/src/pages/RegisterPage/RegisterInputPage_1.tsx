import { Component } from "solid-js";
import { InputGroup, InputPage } from "../../components/Form/Form";
import { page, setPage, setAccountType } from "./RegisterPage.state";
import { AccountType } from "./_shared";

const RegisterInputPage_1: Component = () => {
	function handleSelectPermissions(e: Event) {
		e.preventDefault();

		// Set account type
		const target = e.currentTarget as HTMLButtonElement;
		const accountType = target.value as AccountType;
		setAccountType(accountType);

		// Go to next page
		setPage(page() + 1);
	}

	return (
		<InputPage index={0} current={page}>
			<InputGroup label='Select account type'>
				<button onClick={handleSelectPermissions} value='patient'>
					Patient
				</button>
				<button onClick={handleSelectPermissions} value='nurse'>
					Nurse
				</button>
			</InputGroup>
		</InputPage>
	);
};

export default RegisterInputPage_1;
