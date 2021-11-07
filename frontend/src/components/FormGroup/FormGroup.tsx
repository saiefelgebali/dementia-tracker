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
	minHeight?: number;
	class: string;
}

const FormGroup: Component<FormGroupProps> = (props) => {
	let maxWidth = 600;
	let minHeight = 400;
	let [currentPage, setCurrentPage] = createSignal(0);
	if (props.currentPage) currentPage = props.currentPage;
	if (props.setCurrentPage) setCurrentPage = props.setCurrentPage;
	if (props.maxWidth) maxWidth = props.maxWidth;
	if (props.minHeight) minHeight = props.minHeight;

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
		<div
			class={`${styles.formGroup} ${props.class}`}
			style={{ "max-width": `${maxWidth}px` }}>
			<div class={styles.children}>{props.children}</div>
			<div
				class={styles.pages}
				style={{
					"min-height": `${minHeight}px`,
				}}>
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
