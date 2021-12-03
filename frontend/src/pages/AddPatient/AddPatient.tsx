import { Link, useParams } from "solid-app-router";
import { Component } from "solid-js";
import { postGroupPatient } from "../../api/groups/post.group.patient";
import Form from "../../components/Form/Form";
import FormInput from "../../components/FormInput/FormInput";

const AddPatient: Component = () => {
	const { id } = useParams();

	const addPatientToGroup = async (e: Event) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const email = form.email.value;
		const response = await postGroupPatient({ email, groupId: id });
		if (response?.status === 204) {
			window.location.href = "/";
		}
	};

	return (
		<div>
			<div className='header'>
				<h1>Create a Group</h1>
			</div>
			<Link href={`/groups/${id}`} class='button mb'>
				Go Back
			</Link>
			<Form onSubmit={addPatientToGroup}>
				<div className='mb'>
					<label>User email</label>
					<FormInput type='email' name='email' />
				</div>
				<div className='mb'>
					<button class='button primary'>Add user</button>
				</div>
			</Form>
		</div>
	);
};

export default AddPatient;
