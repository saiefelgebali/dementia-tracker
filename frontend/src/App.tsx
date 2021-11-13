import { Component } from "solid-js";
import { Router, Route, Routes } from "solid-app-router";
import AuthLayout from "./layouts/auth/AuthLayout";
import RegisterPage from "./pages/Register/RegisterPage";
import LoginPage from "./pages/Login/LoginPage";
import GroupsPage from "./pages/Groups/GroupsPage";
import MainLayout from "./layouts/main/MainLayout";
import GroupPage from "./pages/Group/GroupPage";
import UserPage from "./pages/User/UserPage";

const App: Component = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' component={MainLayout}>
					<Route path='/' component={GroupsPage} />
					{/* <Route path='/home' component={HomePage} /> */}
					{/* <Route path='/buy' component={HomePage} /> */}
					<Route path='/groups' component={GroupsPage} />
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
