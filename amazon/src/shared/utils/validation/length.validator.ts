import { LengthOptions } from "./models/options/length";
import { ValidatorFn } from "./models/validatorFn.model";

export const _validateLength: ValidatorFn = (text: string, options?: LengthOptions): boolean => {
	const textLengt = text.trim().length;
	if (options?.min && textLengt < options.min) {
		return false;
	}
	if (options?.max && textLengt > options.max) {
		return false;
	}
	return true;
};

export const validatePasswordLength: ValidatorFn = (text: string): boolean => {
	return _validateLength(text, { min: 8, max: 20 });
};
export const validateNameLength: ValidatorFn = (text: string): boolean => {
	return _validateLength(text, { min: 2 });
};
