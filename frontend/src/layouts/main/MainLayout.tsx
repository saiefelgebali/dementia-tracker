import { Outlet } from "solid-app-router";
import { Component } from "solid-js";
import styles from "./MainLayout.module.scss";

const MainLayout: Component = () => {
	return (
		<div class={styles.mainLayout}>
			<div class={styles.header}>
				<div class={styles.content}>
					<span>1</span>
					<span>2</span>
					<span>3</span>
				</div>
			</div>
			<div class={styles.body}>
				<Outlet />
			</div>
		</div>
	);
};

export default MainLayout;
