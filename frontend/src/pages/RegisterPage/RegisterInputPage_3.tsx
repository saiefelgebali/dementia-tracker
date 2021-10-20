import { Component } from "solid-js";
import { Input, InputPage } from "../../components/Form/Form";
import { page } from "./_shared";

const RegisterInputPage_3: Component = () => {
	return (
		<InputPage index={2} current={page}>
			<Input label='Password'>
				<input type='password' />
			</Input>
			<Input label='Confirm Password'>
				<input type='password' />
			</Input>
			<Input>
				<button>Create Account</button>
			</Input>
		</InputPage>
	);
};

export default RegisterInputPage_3;
