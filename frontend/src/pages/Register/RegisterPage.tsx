import { Component, createSignal, Setter } from "solid-js";
import Form from "../../components/Form/Form";
import FormGroup from "../../components/FormGroup/FormGroup";
import FormNavigation from "../../components/Form/FormNavigation";
import FormInput from "../../components/FormInput/FormInput";
import styles from "./RegisterPage.module.scss";
import { FormPageProps } from "../../components/FormGroup/FormPage";

type AccountType = "patient" | "nurse";

const Page1: Component<FormPageProps> = ({ pageNumber, setCurrentPage }) => {
	const [type, setType] = createSignal<AccountType>("patient");

	return (
		<Form class={styles.formPage}>
			<div>
				<label>Account Type</label>
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
			</div>
			<FormNavigation
				class={styles.navigation}
				page={pageNumber}
				setPage={setCurrentPage}
				next
				nextLabel='Continue'
			/>
		</Form>
	);
};

const Page2: Component<FormPageProps> = ({ pageNumber, setCurrentPage }) => {
	return (
		<Form class={styles.formPage}>
			<div>
				<label>Email</label>
				<FormInput
					type='email'
					required
					placeholder='someone@example.com'
				/>
			</div>
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

const Page3: Component<FormPageProps> = ({ pageNumber, setCurrentPage }) => {
	return (
		<Form class={styles.formPage}>
			<div>
				<label>Password</label>
				<input
					type='password'
					minLength={5}
					required
					placeholder='Password'
				/>
				<label>Confirm Password</label>

				<input
					type='password'
					minLength={5}
					required
					placeholder='Confirm Password'
					oninput={(e) => {
						// check if passwords match
					}}
				/>
			</div>
			<FormNavigation
				class={styles.navigation}
				page={pageNumber}
				setPage={setCurrentPage}
				back
				submit
			/>
		</Form>
	);
};

const RegisterPage: Component = () => {
	const [page, setPage] = createSignal(0);

	const pages = [Page1, Page2, Page3];

	return (
		<div>
			<FormGroup
				class={styles.formGroup}
				maxWidth={600}
				currentPage={page}
				setCurrentPage={setPage}
				pages={pages}>
				<h2>Create an Account</h2>
			</FormGroup>
		</div>
	);
};

export default RegisterPage;
