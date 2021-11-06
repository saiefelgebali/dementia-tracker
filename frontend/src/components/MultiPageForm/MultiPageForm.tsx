import { Component, createEffect, createSignal, For, onMount } from "solid-js";
import styles from "./MultiPageForm.module.scss";

interface MultiPageFormProps {
	ref?: HTMLFormElement;
	pages: Component[];
	header?: Element;
	onSubmit?: (e: Event) => void;
	onClick?: (e: Event) => void;
	onKeyPress?: (e: Event) => void;
	maxWidth?: number;
	classes?: Partial<{
		navigation: string;
		nextButton: string;
		backButton: string;
		submitButton: string;
		form: string;
		formPage: string;
	}>;
}

const MultiPageForm: Component<MultiPageFormProps> = (props) => {
	const { pages, maxWidth = 600 } = props;

	// State variables
	const [pageRefs, setPageRefs] = createSignal<HTMLFormElement[]>([]);
	const [errors, setErrors] = createSignal<string[][]>([]);
	const [currentPage, setCurrentPage] = createSignal(0);

	// Initialize positions of form pages
	function initFormPages(pages: HTMLFormElement[]) {
		pages.forEach((page, index) => {
			page.style.left = `${(index - currentPage()) * maxWidth}px`;
		});
	}

	// Initialize form on load
	createEffect(() => {
		if (!parent) return;
		if (!pageRefs().length) return;

		// Seperate pages
		initFormPages(pageRefs());
	});

	// Change page on click
	const NavButtons: Component<{ index: number }> = ({ index }) => {
		let position: "first" | "middle" | "last";

		if (index === pages.length - 1) position = "last";
		else if (index === 0) position = "first";
		else if (index > 0) position = "middle";

		function nextPage(e: Event) {
			if (position === "last") return;
			const form = (e.currentTarget as HTMLButtonElement).form!;
			if (!form.checkValidity()) return;
			setCurrentPage((prev) => prev + 1);
		}

		function backPage(e: Event) {
			e.preventDefault();
			if (position === "first") return;
			setCurrentPage((prev) => prev - 1);
		}

		const Next = () => {
			return (
				<button class={styles.nextButton} onClick={nextPage}>
					{position === "last" ? "Submit" : "Next"}
				</button>
			);
		};
		const Back = () => {
			if (position === "first") return null;
			return (
				<button class={styles.backButton} onClick={backPage}>
					Back
				</button>
			);
		};

		return (
			<div class={styles.navigation}>
				<Back />
				<Next />
			</div>
		);
	};

	return (
		<div class={styles.multiPageForm} style={{ maxWidth }}>
			<div class={styles.tabs}>
				<For each={pages}>
					{(page, index) => {
						return (
							<div
								classList={{
									[styles.step]: true,
									[styles.active]: index() === currentPage(),
								}}
							/>
						);
					}}
				</For>
			</div>
			{props.header && <div class={styles.header}>{props.header}</div>}
			<div class={styles.pages}>
				<For each={pages}>
					{(page, index) => {
						let pageRef: HTMLFormElement | undefined;

						const [errors, setErrors] = createSignal<string[]>([]);

						onMount(() => {
							setPageRefs((prev) => [
								...prev,
								pageRef as HTMLFormElement,
							]);
						});

						function submitPage(e: Event) {
							e.preventDefault();
							const input = e.currentTarget as HTMLInputElement;
							const form = input.form;

							if (!form) return;

							const invalidInputs: HTMLInputElement[] = [];

							form.querySelectorAll("input:invalid").forEach(
								(input) =>
									invalidInputs.push(
										input as HTMLInputElement
									)
							);

							setErrors(
								invalidInputs.map(
									(input) => input.validationMessage
								)
							);
						}

						return (
							<form
								class={styles.page}
								ref={pageRef}
								onSubmit={submitPage}>
								{page({})}
								<Errors errors={errors()} />
								<NavButtons index={index()} />
							</form>
						);
					}}
				</For>
			</div>
		</div>
	);
};

const Errors: Component<{ errors: string[] }> = ({ errors }) => {
	return (
		<For each={errors}>
			{(error, index) => <div class={styles.error}>{error}</div>}
		</For>
	);
};

export default MultiPageForm;
