import { Link } from "solid-app-router";
import { Component } from "solid-js";
import styles from "./Header.module.scss";

const Header: Component = () => {
	return (
		<div class={styles.header}>
			<div classList={{ main: true, [styles.content]: true }}></div>
		</div>
	);
};

export default Header;
