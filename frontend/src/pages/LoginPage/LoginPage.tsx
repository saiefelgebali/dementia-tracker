import { Component } from "solid-js";
import Form from "../../components/Form/Form";

const LoginPage: Component = () => {
	return (
		<Form>
			<h1>Login to your account</h1>
			<div>
				<div>
					<label>Email</label>
				</div>
				<div>
					<input type='email' />
				</div>
			</div>
			<div>
				<div>
					<label>Password</label>
				</div>
				<div>
					<input type='password' />
				</div>
			</div>
			<div>
				<div>
					<input type='checkbox' />
					<div>Remember me</div>
				</div>
				<div>
					<button>Login</button>
				</div>
			</div>
		</Form>
	);
};

export default LoginPage;
