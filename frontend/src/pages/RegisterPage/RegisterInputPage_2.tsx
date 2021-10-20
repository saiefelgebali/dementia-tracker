import { Component } from "solid-js";
import { Input, InputPage } from "../../components/Form/Form";
import { page, setPage } from "./_shared";

const RegisterInputPage_2: Component = () => {
	return (
		<InputPage index={1} current={page}>
			<Input label='Email'>
				<input type='email' />
			</Input>
			<Input>
				<button
					onclick={(e) => {
						e.preventDefault();
						setPage(page() + 1);
					}}>
					Continue
				</button>
			</Input>
		</InputPage>
	);
};

export default RegisterInputPage_2;
