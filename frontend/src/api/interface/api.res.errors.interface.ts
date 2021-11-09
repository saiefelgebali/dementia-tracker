interface ValidationError {
	msg: string;
	param: string;
}

export interface APIResErrors {
	errors: ValidationError[];
}
