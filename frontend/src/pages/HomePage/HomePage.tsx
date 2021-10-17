import { Component } from "solid-js";
import styles from "./HomePage.module.scss";

const HomePage: Component = () => {
	return (
		<div class={styles.heroSection}>
			<div class={styles.hero}>
				<h1 class='title'>Drift</h1>
				<p class='subtitle'>
					Dementia tracker, to keep your loved ones safe
				</p>
				<div class={styles.inputs}>
					<button class={styles.callToAction}>Buy</button>
				</div>
			</div>
			<div class={styles.map}></div>
		</div>
	);
};

export default HomePage;
