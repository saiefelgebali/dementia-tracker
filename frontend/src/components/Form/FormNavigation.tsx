import { Component, JSX, Setter } from "solid-js";

interface NavButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	page: number;
	setPage: Setter<number>;
	label?: string;
}

export const NextButton: Component<NavButtonProps> = (props) => {
	const { page, setPage, label = "Next" } = props;

	function onClick(e: MouseEvent) {
		if ((e.currentTarget as HTMLButtonElement).form?.checkValidity()) {
			setPage(page + 1);
			e.preventDefault();
		}
	}

	return <button onClick={onClick}>{label}</button>;
};

export const BackButton: Component<NavButtonProps> = (props) => {
	const { page, setPage, label = "Back" } = props;

	function onClick(e: MouseEvent) {
		e.preventDefault();
		setPage(page - 1);
	}

	return (
		<button class='secondary' onClick={onClick}>
			{label}
		</button>
	);
};

interface FormNavigationProps extends NavButtonProps {
	page: number;
	next?: boolean;
	nextLabel?: string;
	back?: boolean;
	backLabel?: string;
	submit?: boolean;
	submitLabel?: string;
}

const FormNavigation: Component<
	FormNavigationProps & JSX.HTMLAttributes<HTMLDivElement>
> = (props) => {
	const {
		page,
		next,
		back,
		submit,
		nextLabel,
		backLabel,
		submitLabel = "Submit",
	} = props;

	return (
		<div {...props}>
			{back && (
				<BackButton
					page={page}
					setPage={props.setPage}
					label={backLabel}
				/>
			)}
			{next && (
				<NextButton
					page={page}
					setPage={props.setPage}
					label={nextLabel}
				/>
			)}
			{submit && <button>{submitLabel}</button>}
		</div>
	);
};

export default FormNavigation;
