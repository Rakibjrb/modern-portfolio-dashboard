import { baseApi } from "../../api/baseApi";
import { type IAbout } from "../../../pages/dashboard/AboutPage/types";

const aboutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAbout: builder.query<{ success: boolean; data: IAbout }, void>({
      query: () => ({
        url: "/about",
        method: "GET",
      }),
      providesTags: ["About"],
    }),
    updateAbout: builder.mutation<
      { success: boolean; data: IAbout },
      Partial<IAbout>
    >({
      query: (data) => ({
        url: "/about",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["About"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAboutQuery, useUpdateAboutMutation } = aboutApi;
export default aboutApi;
