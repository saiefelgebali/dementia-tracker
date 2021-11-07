interface ValidationError {
	msg: string;
	param: string;
}

export interface ResponseErrors {
	errors: ValidationError[];
}
