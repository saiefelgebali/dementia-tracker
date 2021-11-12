import { Accessor, createSignal } from "solid-js";
import localStorage, { LocalStorageType } from "./local.storage";

// Signal linked to local storage
export function createSignalPersist(
	key: string
): [Accessor<string | null>, (value: string) => void] {
	const [value, _setValue] = createSignal(localStorage.get(key));

	function setValue(value: string) {
		localStorage.set(key, value);
		_setValue(value as any);
	}

	return [value, setValue];
}
