import { Component } from "solid-js";
import { Outlet } from "solid-app-router";
import styles from "./AuthLayout.module.scss";

const AuthLayout: Component = () => {
	// Animations on background
	const BackgroundAnimations: Component = () => (
		<div class={styles.backgroundContainer}>
			<div class={styles.slide1}></div>
			<div class={styles.slide2}></div>
			<div class={styles.slide3}></div>
			<div class={styles.slide4}></div>
		</div>
	);

	return (
		<div class={styles.authLayout}>
			<BackgroundAnimations />
			<Outlet />
		</div>
	);
};

export default AuthLayout;
