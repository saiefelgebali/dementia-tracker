import { Link } from "solid-app-router";
import { Component, createResource, For } from "solid-js";
import { getGroups } from "../../api/groups/get.groups";
import { Group } from "../../api/groups/groups.interface";
import styles from "./GroupsPage.module.scss";

const GroupItem: Component<{ group: Group }> = ({ group }) => {
	return (
		<Link href={`/groups/${group._id}`} class='list-item'>
			<div>{group.name}</div>
			<div>{group.patients.length} Users</div>
		</Link>
	);
};

const GroupsPage: Component = () => {
	const [groups] = createResource<Group[]>(
		async (k, prev) => {
			const error = async (response: Response) => {
				console.error(await response.json());
			};

			const catchError = (error: Error) => {
				console.error(error.message);
			};

			const response = await getGroups({}, { error, catchError });

			let newGroups: Group[] = [];

			// success
			if (response?.ok) {
				newGroups = await response.json();
			}

			return [...prev(), ...newGroups];
		},
		{ initialValue: [] }
	);

	return (
		<>
			<div class='header'>
				<h1>Groups</h1>
			</div>
			<div class={styles.createGroup}>
				<button>Create a new group</button>
			</div>

			<div class='list'>
				<For each={groups()}>
					{(group) => <GroupItem group={group} />}
				</For>
			</div>
		</>
	);
};

export default GroupsPage;
