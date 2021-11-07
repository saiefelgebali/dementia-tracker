import { Component, createSignal, For } from "solid-js";
import FormGroup from "../../components/FormGroup/FormGroup";
import { body, errors } from "./register.store";
import styles from "./RegisterPage.module.scss";
import { RegisterPage1 } from "./RegisterPage1";
import { RegisterPage2 } from "./RegisterPage2";
import { RegisterPage3 } from "./RegisterPage3";

const RegisterPage: Component = () => {
	const [page, setPage] = createSignal(0);

	const pages = [RegisterPage1, RegisterPage2, RegisterPage3];

	return (
		<div>
			<FormGroup
				class={styles.formGroup}
				maxWidth={600}
				minHeight={280}
				currentPage={page}
				setCurrentPage={setPage}
				pages={pages}>
				<h2 class={styles.header}>
					Create a
					<span class='primary'>
						{body().permissionFlags === 2 ? " nurse " : " patient "}
					</span>
					account
				</h2>
				<div class={styles.errors}>
					<For each={errors()}>
						{(error) => <div class='error'>{error}</div>}
					</For>
				</div>
			</FormGroup>
		</div>
	);
};

export default RegisterPage;
