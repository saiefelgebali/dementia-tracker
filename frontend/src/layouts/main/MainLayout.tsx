import { Outlet } from "solid-app-router";
import { Component, createEffect } from "solid-js";
import {
	accessToken,
	me,
	setAccessToken,
	setRefreshToken,
} from "../../store/app.store";
import styles from "./MainLayout.module.scss";

const MainLayout: Component = () => {
	function logout() {
		setAccessToken("");
		setRefreshToken("");
		window.location.href = "/auth/login";
	}

	createEffect(() => {
		if (!accessToken()) {
			window.location.href = "/auth/login";
		}
	});

	return (
		<div class={styles.mainLayout}>
			<div class={styles.header}>
				<div class={styles.content}>
					<div class={styles.dropdown}>
						<div>{me()?.email}</div>
						<div class={styles.dropdownMenu}>
							<a onClick={logout}>Log out</a>
						</div>
					</div>
				</div>
			</div>
			<div class={styles.body}>
				<Outlet />
			</div>
		</div>
	);
};

export default MainLayout;
