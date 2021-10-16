import { Outlet } from "solid-app-router";
import { Component } from "solid-js";

const AuthLayout: Component = () => {
	return (
		<div>
			<Outlet />
		</div>
	);
};

export default AuthLayout;
