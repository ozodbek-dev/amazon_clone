
import { DisplayUser } from "../models/DisplayUser";
import { JWT } from "../models/JWT";
import jwt_decode from'jwt-decode'
import { LoginUser } from "../models/LoginUser.interface";
import { NewUser } from "../models/NewUser.type";
import axios from "axios";
import { DecodeJWT } from "../models/DecodeJWT.interface";


const register = async (newUser: NewUser): Promise<DisplayUser | null> => {
	const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, newUser);
	return response.data;
};

const login = async (loginUser: LoginUser): Promise<JWT> => {
	const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, loginUser);
	if (response.data) {
		localStorage.setItem("jwt", response.data.token);
		const decodedToken: DecodeJWT = jwt_decode(response.data.token);
		localStorage.setItem("user", 	JSON.stringify(decodedToken.user));
	}
	return response.data;
};

const logout = ():void => {
	localStorage.removeItem('user');
	localStorage.removeItem('jwt');
}

const verifyJWT = async (jwt: string): Promise<boolean> => {
	const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/verify-jwt`, {jwt});
	if (response.data) {
		const jwtExp = response.data.exp * 1000;
		return jwtExp > Date.now();
	}
	return false;
};

export const authService = {
	register,
	login,
	logout,
	verifyJWT
};
