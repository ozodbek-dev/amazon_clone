import { ValidatorFn } from "./models/validatorFn.model";

export const validateEmail: ValidatorFn = (email: string): boolean => {
	const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi;

	return regex.test(email.trim());
};
