import { Component } from "solid-js";
import { Router, Route, Routes } from "solid-app-router";

import logo from "./logo.svg";
import styles from "./App.module.css";
import Home from "./pages/Home";

const App: Component = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' component={Home} />
			</Routes>
		</Router>
	);
};

export default App;
