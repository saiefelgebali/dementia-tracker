import { Component } from "solid-js";
import { Router, Route, Routes } from "solid-app-router";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Home";

const App: Component = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' component={MainLayout}>
					<Route path='/' component={Home} />
					<Route path='/home' component={Home} />
				</Route>
				<Route path='/auth' component={AuthLayout} />
			</Routes>
		</Router>
	);
};

export default App;
