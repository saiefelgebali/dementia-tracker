import { createSignal } from "solid-js";
import localStorage, { LocalStorageType } from "./local.storage";

// Signal linked to local storage
export function createSignalPersist<T extends LocalStorageType>(key: string) {
	const [value, _setValue] = createSignal<T>(localStorage.get(key));

	function setValue(value: T) {
		localStorage.set(key, value);
		_setValue(value as any);
	}

	return [value, setValue];
}
