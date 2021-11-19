import { Link } from "solid-app-router";
import { Component, createSignal } from "solid-js";
import { createGroup } from "../../api/groups/post.group";
import { APIResErrors } from "../../api/interface/api.res.errors.interface";
import Form from "../../components/Form/Form";
import FormInput from "../../components/FormInput/FormInput";
import { DEBUG } from "../../utility/utility";

const CreateGroup: Component = () => {
	const [loading, setLoading] = createSignal(false);

	const submitCreateGroup = async (e: Event) => {
		e.preventDefault();

		// Make login request
		setLoading(true);

		// gather params
		const form = e.target as HTMLFormElement;
		const name = form.groupName.value;

		// request callbacks
		const success = async (response: Response) => {
			// redirect to groups page
			window.location.href = "/groups";
		};

		const error = async (response: Response) => {
			const res = (await response.json()) as APIResErrors;
			DEBUG && console.error(res);
		};

		const catchError = (error: Error) => {
			DEBUG && console.error("Could not send request");
		};

		await createGroup({ name }, { success, error, catchError });

		// stop loading
		setLoading(false);
	};

	return (
		<div>
			<div className='header'>
				<h1>Create a Group</h1>
			</div>
			<Link href='/' class='button mb'>
				Go Back
			</Link>
			<Form onSubmit={submitCreateGroup}>
				<div className='mb'>
					<label>Group name</label>
					<FormInput
						type='text'
						disabled={loading()}
						name='groupName'
					/>
				</div>
				<div className='mb'>
					<button disabled={loading()} class='mb'>
						Create group
					</button>
				</div>
			</Form>
		</div>
	);
};

export default CreateGroup;
