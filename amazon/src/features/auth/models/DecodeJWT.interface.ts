import { DisplayUser } from "./DisplayUser";

export interface DecodeJWT {
	user: DisplayUser;
	exp: number;
	iat: number;
}
