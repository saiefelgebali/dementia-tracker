import { Outlet } from "solid-app-router";
import { Component } from "solid-js";
import styles from "./Layout.module.scss";

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
			<div class={styles.form}>
				<Outlet />
			</div>
		</div>
	);
};

export default AuthLayout;
