import { Component, createSignal } from "solid-js";
import Form, {
	Input,
	InputGroup,
	InputPage,
	PageGroup,
} from "../../components/Form/Form";

const RegisterPage: Component = () => {
	// On submit form
	function onSubmit(e: Event) {
		e.preventDefault();
		console.log("submit");
	}

	// Account type
	const [accountType, setAccountType] = createSignal<string>();

	// Handle paged form
	const [page, setPage] = createSignal<number>(0);

	const Page1: Component = () => {
		function handleSelectPermissions(e: Event) {
			e.preventDefault();
			setPage(page() + 1);
			setAccountType((e.currentTarget as HTMLButtonElement).value);
		}

		return (
			<InputPage index={0} current={page}>
				<InputGroup label='Choose one'>
					<button onClick={handleSelectPermissions} value='patient'>
						Patient
					</button>
					<button onClick={handleSelectPermissions} value='nurse'>
						Nurse
					</button>
				</InputGroup>
			</InputPage>
		);
	};
	const Page2: Component = () => {
		return (
			<InputPage index={1} current={page}>
				<Input label='Email'>
					<input type='email' />
				</Input>
				<Input>
					<button
						onclick={(e) => {
							e.preventDefault();
							setPage(page() + 1);
						}}>
						Continue
					</button>
				</Input>
			</InputPage>
		);
	};

	const Page3: Component = () => {
		return (
			<InputPage index={2} current={page}>
				<Input label='Password'>
					<input type='password' />
				</Input>
				<Input label='Confirm Password'>
					<input type='password' />
				</Input>
				<Input>
					<button>Create Account</button>
				</Input>
			</InputPage>
		);
	};

	// Combine pages
	const pages = [Page1, Page2, Page3];

	const AccountTypeLabel = () => {
		return <span class='primary'>{accountType()}</span>;
	};

	return (
		<Form onSubmit={onSubmit}>
			<h1>
				Create a new <AccountTypeLabel /> account
			</h1>
			<PageGroup pages={pages} current={page} setCurrent={setPage} />
		</Form>
	);
};

export default RegisterPage;
