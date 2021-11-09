import { Component } from "solid-js";
import { getGroups } from "../../api/groups/get.groups";
import { GetGroupsResponse } from "../../api/groups/groups.interface";
import styles from "./GroupsPage.module.scss";

const Group: Component = () => {
	return (
		<div class={styles.group}>
			<div>Group with the homies</div>
			<div>12 Users</div>
		</div>
	);
};

const GroupsPage: Component = () => {
	const success = async (response: Response) => {
		const res = (await response.json()) as GetGroupsResponse;
		console.log(res);
	};
	const error = (res: Response) => {
		console.log(res);
	};
	const catchError = (res: Error) => {
		console.log(res);
	};

	const res = getGroups(
		{ offset: 0, limit: 10 },
		{
			success,
			error,
			catchError,
		}
	);

	return (
		<div class={styles.p}>
			<div class={styles.header}>
				<h1>Groups</h1>
			</div>
			<div class={styles.createGroup}>
				<button>Create a new group</button>
			</div>

			<div class={styles.groupList}>
				<Group />
				<Group />
				<Group />
				<Group />
			</div>
		</div>
	);
};

export default GroupsPage;
