import { Link, useParams } from "solid-app-router";
import { Component, createResource, For } from "solid-js";
import { getGroup } from "../../api/groups/get.group";
import { Group } from "../../api/groups/groups.interface";
import { User } from "../../api/users/users.interface";

const UserItem: Component<{ user: User }> = ({ user }) => {
	console.log(user);
	return (
		<Link href={`/users/${user._id}`} class='list-item'>
			<div>{user.email}</div>
		</Link>
	);
};

const GroupPage: Component = () => {
	const { id } = useParams();

	const [group] = createResource<Group | null>(
		async (k, prev) => {
			const error = async (response: Response) => {
				console.error(await response.json());
			};

			const catchError = (error: Error) => {
				console.error(error.message);
			};

			const response = await getGroup({ id }, { error, catchError });

			let group: Group | null = null;

			// success
			if (response?.ok) {
				group = await response.json();
			}

			return group || null;
		},
		{ initialValue: null }
	);

	return (
		<>
			<div class='header'>
				<h1>{group()?.name}</h1>
			</div>
			<button>Add patient</button>
			<div className='header'>
				<h2>Patients</h2>
			</div>

			<div class='list'>
				<For each={group()?.patients}>
					{(patient) => <UserItem user={patient} />}
				</For>
			</div>
		</>
	);
};

export default GroupPage;
