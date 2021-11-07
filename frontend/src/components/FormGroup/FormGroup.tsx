import {
	Accessor,
	Component,
	createEffect,
	createSignal,
	For,
	Setter,
} from "solid-js";
import { FormPageProps, FormPageWrapper } from "./FormPage";
import styles from "./FormGroup.module.scss";

interface FormGroupProps {
	currentPage?: Accessor<number>;
	setCurrentPage?: Setter<number>;
	pages: Component<FormPageProps>[];
	maxWidth?: number;
	class: string;
}

const FormGroup: Component<FormGroupProps> = (props) => {
	let maxWidth = 600;
	let [currentPage, setCurrentPage] = createSignal(0);
	if (props.currentPage) currentPage = props.currentPage;
	if (props.setCurrentPage) setCurrentPage = props.setCurrentPage;
	if (props.maxWidth) maxWidth = props.maxWidth;

	const pagePositions = props.pages.map((_, index) => {
		const [get, set] = createSignal((index + currentPage()) * maxWidth);
		return { get, set };
	});

	// Update page position on page change
	createEffect(() => {
		pagePositions.forEach((pagePosition, index) => {
			pagePosition.set((index - currentPage()) * maxWidth);
		});
	});

	return (
		<div class={`${styles.formGroup} ${props.class}`} style={{ maxWidth }}>
			<div class={styles.children}>{props.children}</div>
			<div class={styles.pages}>
				<For each={props.pages}>
					{(page, index) => (
						<FormPageWrapper position={pagePositions[index()].get}>
							{page({
								pageNumber: index(),
								setCurrentPage,
							})}
						</FormPageWrapper>
					)}
				</For>
			</div>
		</div>
	);
};

export default FormGroup;
