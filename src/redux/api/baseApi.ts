import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENV } from "../../config/env";
import { toast } from "sonner";
import { logout, setTokens } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: ENV.API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken = async (
  arg: any,
  api: any,
  extraOptions: any,
) => {
  let result = await baseQuery(arg, api, extraOptions);

  if (result.error?.status === 404) {
    const errorData: any = result.error?.data || { message: "Not found" };
    toast.error(errorData.message);
  }

  if (result.error?.status === 403) {
    const errorData: any = result.error?.data || { message: "Forbidden" };
    toast.error(errorData.message);
  }

  if (result.error?.status === 401) {
    // Try to refresh the token using refresh token from cookies state

    try {
      const res = await fetch(`${ENV.API_BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ refreshToken: "" }),
      });

      const data = await res.json();

      if (data?.success && data?.data?.accessToken) {
        // Update tokens in Redux store
        const newTokens = {
          accessToken: data.data.accessToken,
        };

        api.dispatch(setTokens(newTokens));

        // Retry the original request
        result = await baseQuery(arg, api, extraOptions);
      } else {
        // Refresh failed, logout user
        api.dispatch(logout());
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["auth", "Projects", "Contacts", "Experiences"],
  endpoints: () => ({}),
});
