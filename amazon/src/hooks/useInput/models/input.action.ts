export enum InputAction {
	INPUT_ACTION_CHANGE = "CHANGE",
	INPUT_ACTION_BLUR = "BLUR",
	INPUT_ACTION_CLEAR = "CLEAR",
}
export type InputActionType = typeof InputAction[keyof typeof InputAction];

