import { Accessor, Component, For } from "solid-js";
import styles from "./FormErrors.module.scss";

interface FormErrorsProps {
	errors: Accessor<string[]>;
}

const FormErrors: Component<FormErrorsProps> = ({ errors }) => {
	return (
		<div class={styles.errors}>
			<For each={errors()}>
				{(error) => <div class='error'>{error}</div>}
			</For>
		</div>
	);
};

export default FormErrors;
