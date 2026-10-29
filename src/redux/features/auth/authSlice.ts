import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    refreshToken: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user, token, refreshToken } = action.payload;
            state.user = user;
            state.token = token;
            state.refreshToken = refreshToken;
        },
        setTokens: (state, action) => {
            const { token, refreshToken } = action.payload;
            state.token = token;
            state.refreshToken = refreshToken;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.refreshToken = null;
        },
    },
});

export const { setUser, setTokens, logout } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const useCurrentToken = (state: any) => state.auth.token;
export const useCurrentRefreshToken = (state: any) => state.auth.refreshToken;
export const selectCurrentUser = (state: any) => state.auth.user;
export const selectIsAuthenticated = (state: any) => !!state.auth.token;