import { useParams } from "solid-app-router";
import {
	Component,
	createEffect,
	createResource,
	createSignal,
	For,
} from "solid-js";
import { deleteUserDataRequest } from "../../api/users/delete.user.data.request";
import { getUserDataRequest } from "../../api/users/get.user.data.request";
import { getUserRequest } from "../../api/users/get.user.request";
import { User, UserData } from "../../api/users/users.interface";
import Map from "../../components/Map/Map";
import { socket } from "../../ws/socket";

const UserPage: Component = () => {
	const { id } = useParams();
	const [loading, setLoading] = createSignal(false);
	const [map, setMap] = createSignal<google.maps.Map>();

	socket().emit("welcome", id);

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

	const [data, { mutate, refetch }] = createResource<UserData[]>(
		async (k, prev) => {
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

			let userData: UserData[] = [];

			// success
			if (response?.ok) {
				userData = await response.json();
			}

			setLoading(false);

			return userData;
		},
		{
			initialValue: [],
		}
	);

	socket().on("data", (data) => {
		refetch();
	});

	createEffect(() => {
		const currentMap = map();
		if (!currentMap) return;

		function addUserDataPath(map: google.maps.Map) {
			if (!data) return;

			const path = new google.maps.Polyline({
				map,
			});

			const userPath = data()
				.map((d) => {
					const latLng = d.location.split(" ");
					if (!latLng || latLng.length !== 2) return null;
					return {
						lat: parseFloat(latLng[0]),
						lng: parseFloat(latLng[1]),
					} as google.maps.LatLngLiteral;
				})
				.filter((d) => d !== null) as google.maps.LatLngLiteral[];
			path.setPath(userPath);
		}

		addUserDataPath(currentMap);
	});

	const DataItem: Component<{ data: UserData; refetch: Function }> = ({
		data,
		refetch,
	}) => {
		async function deleteData() {
			// remove from list
			mutate((userData) => userData?.filter((d) => d._id !== data._id));

			// make delete request
			const res = await deleteUserDataRequest({ id, dataId: data._id });

			if (res?.status !== 204) {
				console.log("Could not delete user data");
			}

			refetch();
		}

		return (
			<div class='list-item'>
				<div>{data.location}</div>
				<button onClick={deleteData}>Delete</button>
			</div>
		);
	};

	return (
		<>
			<div class='header'>
				<h1>{user()?.email}</h1>
			</div>

			<div className='header'>
				<h2>Path</h2>
			</div>

			<Map
				callback={(map) => setMap(map)}
				// polygonInitial={[{ lat: 52.1780726, lng: 0.1349691402320342 }]}
			/>

			<div className='header'>
				<h2>Location Data</h2>
			</div>
			<div class='list'>
				<For each={data()}>
					{(data) => <DataItem data={data} refetch={refetch} />}
				</For>
				{loading() && <div class='list-item'>Loading...</div>}
			</div>
		</>
	);
};

export default UserPage;
