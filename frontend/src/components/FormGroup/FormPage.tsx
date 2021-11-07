import { Accessor, Component, createEffect, Setter } from "solid-js";
import styles from "./FormPage.module.scss";

export interface FormPageProps {
	pageNumber: number;
	setCurrentPage: Setter<number>;
}

interface FormPageWrapperProps {
	position: Accessor<number>;
}

export const FormPageWrapper: Component<FormPageWrapperProps> = ({
	children,
	position,
}) => {
	return (
		<div style={{ left: `${position()}px` }} class={styles.formPageWrapper}>
			{children}
		</div>
	);
};
