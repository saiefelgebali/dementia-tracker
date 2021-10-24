export interface TestGroup {
	id: string;

	body: {
		name: string;
		nurses: string[];
		patients: string[];
	};
}
