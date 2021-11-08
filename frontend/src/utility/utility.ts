export const DEBUG = false;

export function filterObjectFunctions(props: Object) {
	return Object.fromEntries(
		Object.entries(props).filter(
			([key, value]) => typeof value !== "function"
		)
	);
}
