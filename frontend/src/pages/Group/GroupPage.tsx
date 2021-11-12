import { Link, useParams } from "solid-app-router";
import { Component, createResource, createSignal, For } from "solid-js";
import { getGroup } from "../../api/groups/get.group";
import { Group } from "../../api/groups/groups.interface";
import { User } from "../../api/users/users.interface";
import Map from "../../components/Map/Map";

const UserItem: Component<{ user: User }> = ({ user }) => {
	return (
		<Link href={`/users/${user._id}`} class='list-item'>
			<div>{user.email}</div>
		</Link>
	);
};

const GroupPage: Component = () => {
	const { id } = useParams();
	const [loading, setLoading] = createSignal(false);
	const [polygon, setPolygon] = createSignal<google.maps.Polygon>();

	const [group] = createResource<Group | null>(
		async (k, prev) => {
			setLoading(true);

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

			setLoading(false);

			return group;
		},
		{ initialValue: null }
	);

	function handleSavePerimeter() {
		if (!polygon()) return;

		const path = polygon()
			?.getPath()
			.getArray()
			.map((v) => v.toJSON());

		// post to group
		console.log(path);
	}

	return (
		<>
			<div class='header'>
				<h1>{group()?.name}</h1>
			</div>

			<div className='header'>
				<h2>Perimeter</h2>
			</div>
			<Map
				// polygonInitial={[{ lat: 52.1780726, lng: 0.1349691402320342 }]}
				callback={(map, polygon) => {
					setPolygon(polygon);
				}}
			/>

			{polygon() && <button onclick={handleSavePerimeter}>Save</button>}

			<div className='header'>
				<h2>Patients</h2>
			</div>
			<button class='mb'>Add patient</button>

			<div class='list'>
				<For each={group()?.patients}>
					{(patient) => <UserItem user={patient} />}
				</For>
				{loading() && <div class='list-item'>Loading...</div>}
			</div>
		</>
	);
};

export default GroupPage;
