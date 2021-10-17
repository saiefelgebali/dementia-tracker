import { Link } from "solid-app-router";
import { Component } from "solid-js";
import styles from "./Header.module.scss";

const Header: Component = () => {
	return (
		<div class={styles.header}>
			<div classList={{ main: true, [styles.content]: true }}>
				<Link href='/home' class={styles.option}>
					<div class={styles.text}>Home</div>
				</Link>
				<Link href='/buy' class={styles.option}>
					<div class={styles.text}>Buy</div>
				</Link>
				<Link href='/auth/login' class={styles.option}>
					<div class={styles.text}>Login</div>
				</Link>
				<Link href='/auth/register' class={styles.option}>
					<div class={styles.text}>Register</div>
				</Link>
			</div>
		</div>
	);
};

export default Header;
