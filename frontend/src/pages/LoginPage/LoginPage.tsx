import { Component } from "solid-js";
import Form, { Input, InputGroup } from "../../components/Form/Form";

const LoginPage: Component = () => {
	function onSubmit(e: Event) {
		e.preventDefault;
	}

	return (
		<Form onSubmit={onSubmit}>
			<h1>Login to your account</h1>
			<Input label='Email'>
				<input type='email' />
			</Input>
			<Input label='Password'>
				<input type='password' />
			</Input>
			<Input>
				<button>Login</button>
			</Input>
		</Form>
	);
};

export default LoginPage;
