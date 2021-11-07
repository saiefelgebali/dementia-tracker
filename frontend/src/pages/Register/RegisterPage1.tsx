import { Link } from "solid-app-router";
import { Component, createEffect, createSignal } from "solid-js";
import Form from "../../components/Form/Form";
import FormNavigation from "../../components/Form/FormNavigation";
import { FormPageProps } from "../../components/FormGroup/FormPage";
import { loading, setBody } from "./register.store";
import styles from "./RegisterPage.module.scss";

type AccountType = "patient" | "nurse";

export const RegisterPage1: Component<FormPageProps> = ({
	pageNumber,
	setCurrentPage,
}) => {
	const [type, setType] = createSignal<AccountType>("patient");

	// update form body when type changes
	createEffect(() => {
		// select correct permission flags
		let permissionFlags: 1 | 2;
		if (type() === "nurse") permissionFlags = 2;
		else permissionFlags = 1; // default to patient

		setBody((prev) => ({ ...prev, permissionFlags }));
	});

	return (
		<Form class={styles.formPage}>
			<div>
				<fieldset disabled={loading()}>
					<label>Select account type</label>
					<div class={styles.selectAccountType}>
						<button
							type='button'
							onClick={() => setType("patient")}
							class={`${
								type() === "patient" ? "primary" : "secondary"
							}`}>
							Patient
						</button>
						<button
							type='button'
							onClick={() => setType("nurse")}
							class={`${
								type() === "nurse" ? "primary" : "secondary"
							}`}>
							Nurse
						</button>
					</div>
				</fieldset>
			</div>
			<FormNavigation
				class={styles.navigation}
				page={pageNumber}
				setPage={setCurrentPage}
				next
				nextLabel='Continue'>
				<Link href='/auth/login' class='button secondary'>
					Login Instead
				</Link>
			</FormNavigation>
		</Form>
	);
};
