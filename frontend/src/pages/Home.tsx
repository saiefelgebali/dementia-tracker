import { Router, Routes, Route } from "solid-app-router";
import { Component } from "solid-js";
import Header from "../components/Header/Header";

const Home: Component = () => {
	return (
		<Router>
			<Header />
		</Router>
	);
};

export default Home;
