import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DisplayUser } from "./models/DisplayUser";
import { JWT } from "./models/JWT";
import { NewUser } from "./models/NewUser.type";
import { authService } from "./services/auth.services";
import { LoginUser } from "./models/LoginUser.interface";

interface AsyncState {
	isLoading: boolean;
	isSuccess: boolean;
	isError: boolean;
}

interface AuthState extends AsyncState {
	user?: DisplayUser | null;
	jwt: string | null;
	isAuthenticated?: boolean;
}

const storedUser: string | null = localStorage.getItem("user");
const user: DisplayUser | null = !!storedUser ? JSON.parse(storedUser) : null;
const storedJWT: string | null = localStorage.getItem("jwt");
const jwt: string | null = !!storedJWT ? storedJWT : null;

const initialState: AuthState = {
	isLoading: false,
	isSuccess: false,
	isError: false,
	user,
	jwt,
	isAuthenticated: false,
};

export const register = createAsyncThunk("auth/register", async (user: NewUser, thunkAPI) => {
	try {
		return await authService.register(user);
	} catch (err) {
		return thunkAPI.rejectWithValue("Unable to register");
	}
});

export const login = createAsyncThunk("auth/login", async (user: LoginUser, thunkAPI) => {
	try {
		return await authService.login(user);
	} catch (err) {
		console.log(err);
		return thunkAPI.rejectWithValue("Unable to login");
	}
});

export const logout = createAsyncThunk("auth/logout", (_, thunkAPI) => {
	try {
		return authService.logout();
	} catch (err) {
		return thunkAPI.rejectWithValue("Unable to Logout");
	}
});

export const veriryJwt = createAsyncThunk("auth/verify_jwt", async (jwt: string, thunkAPI) => {
	try {
		return await authService.verifyJWT(jwt);
	} catch (err) {
		return thunkAPI.rejectWithValue("Unable to verify JWT");
	}
});

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		reset: state => {
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = false;
		},
	},
	extraReducers: builder => {
		////////////////////////////register//////////////////////////
		builder
			.addCase(register.pending, state => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(register.rejected, state => {
				state.isLoading = false;
				state.isError = true;
				state.user = null;
			})
			////////////////////////////Login//////////////////////////
			.addCase(login.pending, state => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isAuthenticated = true;
				state.jwt = action.payload.jwt?.token || null;
				state.user = action.payload.user;
			})
			.addCase(login.rejected, state => {
				state.isLoading = false;
				state.isError = true;
				state.user = null;
				state.isAuthenticated = false;
			})
			////////////////////////////Verify jwt//////////////////////////
			.addCase(veriryJwt.pending, state => {
				state.isLoading = true;
			})
			.addCase(veriryJwt.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isAuthenticated = action.payload;
			})
			.addCase(veriryJwt.rejected, state => {
				state.isLoading = false;
				state.isError = true;
				state.isAuthenticated = false;
			})
			////////////////////////////Logout//////////////////////////
			.addCase(logout.fulfilled, state => {
				state.isLoading = false;
				state.jwt = null;
				state.user = null;
				state.isAuthenticated = false;
			});
	},
});

export const { reset } = authSlice.actions;
