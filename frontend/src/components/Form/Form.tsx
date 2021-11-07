import { Component, JSX } from "solid-js";

interface FormProps extends JSX.FormHTMLAttributes<HTMLFormElement> {
	onSubmit?: (e: Event) => void;
}

const Form: Component<FormProps> = (props) => {
	return (
		<form {...props} onSubmit={props.onSubmit}>
			{props.children}
		</form>
	);
};

export default Form;
