export const DEBUG = true;

export function filterObjectFunctions(props: Object) {
	return Object.fromEntries(
		Object.entries(props).filter(
			([key, value]) => typeof value !== "function"
		)
	);
}

export function isJsonString(str: string) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}
