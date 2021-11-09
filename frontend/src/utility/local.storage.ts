import { isJsonString } from "./utility";

export type LocalStorageType = string | number | object | null;

class LocalStorage {
	private appTag = "DT";
	private storage: Storage;

	constructor() {
		this.storage = window.localStorage;
	}

	private parseKey(key: string) {
		return `${this.appTag}_${key}`;
	}

	public set<T extends LocalStorageType>(key: string, value: T) {
		let stringValue: string;

		// parse value to string
		if (typeof value === "string") stringValue = value;
		else if (typeof value === "number") stringValue = value.toString();
		else if (typeof value === "object") stringValue = JSON.stringify(value);
		else {
			throw new Error(
				"LocalStorage value must be a string, number or an object"
			);
		}

		this.storage.setItem(this.parseKey(key), stringValue);
	}

	public get<T extends LocalStorageType>(key: string): T {
		const stringValue = this.storage.getItem(this.parseKey(key));
		let parseValue: LocalStorageType = stringValue;

		// parse string to expected type
		if (stringValue === null) parseValue = null;
		else if (parseFloat(stringValue)) parseValue = parseFloat(stringValue);
		else if (isJsonString(stringValue))
			parseValue = JSON.parse(stringValue);

		return parseValue as T;
	}

	public remove(key: string) {
		this.storage.removeItem(this.parseKey(key));
	}
}

export default new LocalStorage();
