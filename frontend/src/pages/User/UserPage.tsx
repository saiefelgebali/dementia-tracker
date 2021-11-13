import { useParams } from "solid-app-router";
import { Component, createResource, createSignal, For } from "solid-js";
import { getUserDataRequest } from "../../api/users/get.user.data.request";
import { getUserRequest } from "../../api/users/get.user.request";
import { User, UserData } from "../../api/users/users.interface";
import Map from "../../components/Map/Map";

const DataItem: Component<{ data: UserData }> = ({ data }) => {
	return (
		<div class='list-item'>
			<div>{data.location}</div>
		</div>
	);
};

const UserPage: Component = () => {
	const { id } = useParams();
	const [loading, setLoading] = createSignal(false);

	const [user] = createResource<User | null>(async (k, prev) => {
		setLoading(true);

		const error = async (response: Response) => {
			console.error(await response.json());
		};

		const catchError = (error: Error) => {
			console.error(error.message);
		};

		const response = await getUserRequest({ id }, { error, catchError });

		let user: User | null = null;

		// success
		if (response?.ok) {
			user = await response.json();
		}

		setLoading(false);

		return user;
	});

	const [data] = createResource<UserData[] | null>(async (k, prev) => {
		setLoading(true);

		const error = async (response: Response) => {
			console.error(await response.json());
		};

		const catchError = (error: Error) => {
			console.error(error.message);
		};

		const response = await getUserDataRequest(
			{ id },
			{ error, catchError }
		);

		let userData: UserData[] | null = null;

		// success
		if (response?.ok) {
			userData = await response.json();
		}

		setLoading(false);

		return userData;
	});

	return (
		<>
			<div class='header'>
				<h1>{user()?.email}</h1>
			</div>

			<div className='header'>
				<h2>Path</h2>
			</div>
			<Map
			// polygonInitial={[{ lat: 52.1780726, lng: 0.1349691402320342 }]}
			/>

			<div className='header'>
				<h2>Location Data</h2>
			</div>
			<div class='list'>
				<For each={data()}>{(data) => <DataItem data={data} />}</For>
				{loading() && <div class='list-item'>Loading...</div>}
			</div>
		</>
	);
};

export default UserPage;
