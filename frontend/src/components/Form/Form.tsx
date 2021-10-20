import { Accessor, Component, For } from "solid-js";
import styles from "./Form.module.scss";

// Container element
const Form: Component<{ onSubmit: (e: Event) => void }> = ({
	children,
	onSubmit,
}) => {
	return (
		<form class={styles.form} onSubmit={onSubmit}>
			{children}
		</form>
	);
};

// Multi-use Label
const Label: Component<{ label?: string }> = ({ label }) =>
	label && <label>{label}</label>;

// Single Input
export const Input: Component<{ label?: string }> = ({ children, label }) => {
	return (
		<div class={styles.input}>
			<Label label={label} />
			{children}
		</div>
	);
};

// Group of inputs in one line
export const InputGroup: Component<{ label?: string }> = ({
	children,
	label,
}) => {
	return (
		<div class={styles.inputGroup}>
			<Label label={label} />
			<div class={styles.inputs}>{children}</div>
		</div>
	);
};

// Show page of inputs when active
export const InputPage: Component<{
	index: number;
	current: Accessor<number>;
}> = ({ children, index, current }) => {
	return <div classList={{ hidden: index !== current() }}>{children}</div>;
};

// Show available pages
export const PageGroup: Component<{
	pages: Component[];
	current: Accessor<number>;
	setCurrent: (prev: number) => number;
	ref?: HTMLDivElement;
}> = ({ pages, current, setCurrent, ref }) => {
	// Show tabs
	const Tabs = () => {
		return (
			<div class={styles.pagesTabs} ref={ref}>
				<For each={pages}>
					{(page, index) => (
						<div
							classList={{
								[styles.tab]: true,
								[styles.selected]: index() === current(),
							}}
							onclick={() => setCurrent(index())}>
							{index() + 1}
						</div>
					)}
				</For>
			</div>
		);
	};

	const CurrentPage: Component = () => {
		return <>{pages[current()]}</>;
	};

	return (
		<>
			<Tabs />
			<CurrentPage />
		</>
	);
};

export default Form;
