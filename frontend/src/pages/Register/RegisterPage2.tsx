import { Component, createEffect, createSignal } from "solid-js";
import Form from "../../components/Form/Form";
import FormNavigation from "../../components/Form/FormNavigation";
import { FormPageProps } from "../../components/FormGroup/FormPage";
import FormInput from "../../components/FormInput/FormInput";
import { loading, setBody } from "./register.store";
import styles from "./RegisterPage.module.scss";

export const RegisterPage2: Component<FormPageProps> = ({
	pageNumber,
	setCurrentPage,
}) => {
	const [email, setEmail] = createSignal<string>("");

	createEffect(() => {
		setBody((prev) => ({ ...prev, email: email() }));
	});

	return (
		<Form class={styles.formPage}>
			<fieldset disabled={loading()}>
				<label>Email address</label>
				<FormInput
					inputValue={email}
					setInputValue={setEmail}
					type='email'
					required
					placeholder='someone@example.com'
				/>
			</fieldset>
			<FormNavigation
				class={styles.navigation}
				page={pageNumber}
				setPage={setCurrentPage}
				next
				nextLabel='Continue'
				back
			/>
		</Form>
	);
};
