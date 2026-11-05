import { baseApi } from "../../api/baseApi";

const experienceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getExperience: builder.query({
      query: () => {
        return {
          url: `/experiences`,
          method: "GET",
        };
      },
      providesTags: ["Experiences"],
    }),
    createExperience: builder.mutation({
      query: (data) => ({
        url: `/experiences`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Experiences"],
    }),
    updateExperience: builder.mutation({
      query: ({ data, id }) => ({
        url: `/experiences/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Experiences"],
    }),
    deleteExperience: builder.mutation({
      query: (id) => ({
        url: `/experiences/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Experiences"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetExperienceQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} = experienceApi;
export default experienceApi;
