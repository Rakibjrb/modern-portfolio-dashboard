import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    accessToken: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
        },
        setTokens: (state, action) => {
            const { accessToken } = action.payload;
            state.accessToken = accessToken;
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
        },
    },
});

export const { setUser, setTokens, logout } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const useCurrentToken = (state: any) => state.auth.accessToken;
export const selectCurrentUser = (state: any) => state.auth.user;
export const selectIsAuthenticated = (state: any) => !!state.auth.accessToken;