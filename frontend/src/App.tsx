import { Component, createResource } from "solid-js";
import { Router, Route, Routes } from "solid-app-router";
import AuthLayout from "./layouts/auth/AuthLayout";
import RegisterPage from "./pages/Register/RegisterPage";
import LoginPage from "./pages/Login/LoginPage";
import GroupsPage from "./pages/Groups/GroupsPage";
import MainLayout from "./layouts/main/MainLayout";
import GroupPage from "./pages/Group/GroupPage";
import UserPage from "./pages/User/UserPage";
import { User } from "./api/users/users.interface";
import { getMe } from "./api/users/get.me.request";
import { accessToken, setMe } from "./store/app.store";
import CreateGroup from "./pages/CreateGroup/CreateGroup";

const App: Component = () => {
	const [meResource] = createResource<User | undefined>(async () => {
		const token = accessToken();

		if (!token) return;

		const res = await getMe({ accessToken: token });

		if (res?.status === 200) {
			const meUser = (await res.json()) as User;
			setMe(meUser);
			return meUser;
		}
	});

	return (
		<Router>
			<Routes>
				<Route path='/' component={MainLayout}>
					<Route path='/' component={GroupsPage} />
					{/* <Route path='/home' component={HomePage} /> */}
					{/* <Route path='/buy' component={HomePage} /> */}
					<Route path='/groups' component={GroupsPage} />
					<Route path='/groups/create' component={CreateGroup} />
					<Route path='/groups/:id' component={GroupPage} />
					<Route path='/users/:id' component={UserPage} />
				</Route>
				<Route path='/auth' component={AuthLayout}>
					<Route path='/login' component={LoginPage} />
					<Route path='/register' component={RegisterPage} />
				</Route>
			</Routes>
		</Router>
	);
};

export default App;
