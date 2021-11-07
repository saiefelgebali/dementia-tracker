interface ValidationError {
	msg: string;
}

export interface ResponseErrors {
	errors: ValidationError[];
}
