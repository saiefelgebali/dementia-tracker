import { Component } from "solid-js";
import styles from "./Form.module.scss";

const Form: Component = ({ children }) => {
	return <form class={styles.form}>{children}</form>;
};

export default Form;
