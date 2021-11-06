import { Component } from "solid-js";
import { Outlet } from "solid-app-router";
import styles from "./AuthLayout.module.scss";

const AuthLayout: Component = () => {
	return (
		<div class={styles.authLayout}>
			<Outlet />
		</div>
	);
};

export default AuthLayout;
