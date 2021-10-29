import { Component } from "solid-js";
import { Input, InputPage } from "../../components/Form/Form";
import { email, page, setEmail, setPage } from "./RegisterPage.state";

const RegisterInputPage_2: Component = () => {
	return (
		<InputPage index={1} current={page}>
			<Input label='Email'>
				<input
					type='email'
					value={email()}
					oninput={(e) => setEmail(e.currentTarget.value)}
				/>
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
