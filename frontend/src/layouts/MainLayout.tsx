import { Outlet } from "solid-app-router";
import { Component } from "solid-js";
import Header from "../components/Header/Header";

const MainLayout: Component = () => {
	return (
		<div>
			<Header />
			<Outlet />
		</div>
	);
};

export default MainLayout;
