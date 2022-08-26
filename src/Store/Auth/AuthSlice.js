import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
	name: "Auth",
	initialState: {
		status: "checking", //checking,not-authenticaded,authenticaded
		uid: null,
		email: null,
		displayName: null,
		photoUrl: null,
		errorMessage: null,
	},
	reducers: {
		login: (state, { payload }) => {
			state.status = "authenticated"; //checking,not-authenticaded,authenticaded
			state.uid = payload.uid;
			state.email = payload.email;
			state.displayName = payload.displayName;
			state.photoUrl = payload.photoUrl;
			state.errorMessage = "null";
		},
		logout: (state, { payload }) => {
			console.log("LOGOUT");
			state.status = "not-authenticated"; //checking,not-authenticaded,authenticaded
			state.uid = null;
			state.email = null;
			state.displayName = null;
			state.photoUrl = null;
			state.errorMessage = payload?.errorMessage;
		},
		checkingCredentials: (state) => {
			state.status = "checking";
		},
	},
});

export const { login, logout, checkingCredentials } = AuthSlice.actions;
