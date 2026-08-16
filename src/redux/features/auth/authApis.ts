import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                body: userInfo,
            }),
        }),
        refreshToken: builder.mutation({
            query: (refreshToken) => ({
                url: "/auth/refresh-token",
                method: "POST",
                body: { refreshToken },
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useLoginMutation,
    useRefreshTokenMutation,
} = authApi;
export default authApi;