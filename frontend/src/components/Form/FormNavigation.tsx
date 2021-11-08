import { Accessor, Component, JSX, Setter } from "solid-js";
import { filterObjectFunctions } from "../../utility/utility";

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
	loading?: Accessor<boolean>;
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
		loading,
	} = props;

	return (
		<div {...filterObjectFunctions(props)}>
			{next && (
				<NextButton
					page={page}
					setPage={props.setPage}
					label={nextLabel}
				/>
			)}

			{submit && (
				<button disabled={(loading && loading()) || false}>
					{loading && loading()
						? "loading"
						: submitLabel || submitLabel}
				</button>
			)}

			{back && (
				<BackButton
					page={page}
					setPage={props.setPage}
					label={backLabel}
				/>
			)}

			{props.children}
		</div>
	);
};

export default FormNavigation;
