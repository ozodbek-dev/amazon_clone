import { _validateLength } from "./length.validator";
import { confirmPassword } from "./models/confirmPassword.interface";

export const validPassowrdMatch = (password: string, confirmPassword: string):confirmPassword => {

  if (!_validateLength(password, { min: 8, max: 20 })) {
    return {
      valid: false,
      message: "Password must be between 8 and 20 characters"
    }
  }
   
  if (password !== confirmPassword) {
  return {
    valid: false,
    message: "Passwords do not match"
  }
  }
  
  return {
    valid: true
  }
	
};
