import { Link, useParams } from "solid-app-router";
import { Component } from "solid-js";
import { User } from "../../api/users/users.interface";
import Form from "../../components/Form/Form";
import FormInput from "../../components/FormInput/FormInput";

const AddPatient: Component = () => {
	const { id } = useParams();

	const addPatientToGroup = (e: Event) => {
		const form = e.target as HTMLFormElement;
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
