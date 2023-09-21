import { actionModel } from "@/shared/models";
import { InputAction, InputActionType } from "./models/input.action";
import { InputState } from "./models/inputState.interface";
import { ChangeEvent, useReducer } from "react";
import { ValidatorFn } from "@/shared/utils/validation/models/validatorFn.model";
const initialInputState: InputState = {
	text: "",
	hasBeenTouched: false,
};

 const inputReducer = (state: InputState , action: actionModel.Action<InputActionType>) => {
	const { type, value = "" } = action;
	switch (type) {
		case InputAction.INPUT_ACTION_CHANGE:
			return {
				text: value,
				hasBeenTouched: state.hasBeenTouched,
			};
		case InputAction.INPUT_ACTION_BLUR:
			return {
				...state,
				hasBeenTouched: true,
			};
		case InputAction.INPUT_ACTION_CLEAR:
			return {
				text: "",
				hasBeenTouched: false,
			};
		default:
			return { ...state };
	}
};

const useInput = (validatirFn?: ValidatorFn) => {
  const [{ text, hasBeenTouched }, dispatch] = useReducer(inputReducer, initialInputState);
  let shouldDisplayError;
  if(validatirFn){
    const isValid = validatirFn(text);
    shouldDisplayError = !isValid && hasBeenTouched;
  }
  
  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>)=>{
    dispatch({type:InputAction.INPUT_ACTION_CHANGE, value:e.target.value})
  }
  const inputBlurHandler = (e: FocusEvent<HTMLInputElement>)=>{
    dispatch({type:InputAction.INPUT_ACTION_BLUR})
  }
  const clearHandler = ()=>{
    dispatch({type:InputAction.INPUT_ACTION_CLEAR})
  }

  return {
    text,
    shouldDisplayError,
    hasBeenTouched,
    inputChangeHandler,
    inputBlurHandler,
    clearHandler
  }
}

export default useInput;