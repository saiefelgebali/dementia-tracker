import { Component } from "solid-js";
import { Router, Route, Routes } from "solid-app-router";
import AuthLayout from "./layouts/auth/AuthLayout";
import RegisterPage from "./pages/Register/RegisterPage";

const App: Component = () => {
	return (
		<Router>
			<Routes>
				{/* <Route path='/' component={MainLayout}>
					<Route path='/' component={HomePage} />
					<Route path='/home' component={HomePage} />
					<Route path='/buy' component={HomePage} />
				</Route> */}
				<Route path='/auth' component={AuthLayout}>
					{/* <Route path='/login' component={LoginPage} /> */}
					<Route path='/register' component={RegisterPage} />
				</Route>
			</Routes>
		</Router>
	);
};

export default App;
