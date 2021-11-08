import { Component, JSX } from "solid-js";
import { filterObjectFunctions } from "../../utility/utility";

interface FormProps extends JSX.FormHTMLAttributes<HTMLFormElement> {
	onSubmit?: (e: Event) => void;
}

const Form: Component<FormProps> = (props) => {
	return (
		<form {...filterObjectFunctions(props)} onSubmit={props.onSubmit}>
			{props.children}
		</form>
	);
};

export default Form;
