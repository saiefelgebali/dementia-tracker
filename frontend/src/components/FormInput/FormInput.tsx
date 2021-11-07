import { Accessor, Setter, Component, createSignal, JSX } from "solid-js";
import { filterObjectFunctions } from "../../utility";

interface FormInputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
	inputValue?: Accessor<string>;
	setInputValue?: Setter<string>;
	customValidator?: (input: HTMLInputElement) => void;
}

const FormInput: Component<FormInputProps> = (props) => {
	const { inputValue, setInputValue } = props;
	const [isValid, setIsValid] = createSignal<boolean>(true);

	// Run input validation
	function validate(input: HTMLInputElement) {
		// validate input when leaves user focus
		setIsValid(input.checkValidity());
	}

	function onInput(e: Event) {
		// Update value
		const input = e.target as HTMLInputElement;
		if (setInputValue) setInputValue(input.value);

		// Run custom validators for input
		props.customValidator && props.customValidator(input);

		// Run validation
		validate(input);
	}

	return (
		<input
			{...filterObjectFunctions(props)}
			classList={{ ...props.classList, invalid: !isValid() }}
			value={inputValue && inputValue()}
			onInput={onInput}
		/>
	);
};

export default FormInput;
