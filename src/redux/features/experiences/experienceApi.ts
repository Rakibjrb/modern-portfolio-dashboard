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
      query: ({ data, type }) => {
        if (type === "professional") {
          return {
            url: `/experiences/professional`,
            method: "POST",
            body: data,
          };
        }
        return {
          url: `/experiences/academic`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Experiences"],
    }),
    updateExperience: builder.mutation({
      query: ({ data, id, type }) => {
        if (type === "professional") {
          return {
            url: `/experiences/professional/${id}`,
            method: "PUT",
            body: data,
          };
        }
        return {
          url: `/experiences/academic/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Experiences"],
    }),
    deleteExperience: builder.mutation({
      query: ({ id, type }) => {
        if (type === "professional") {
          return {
            url: `/experiences/professional/${id}`,
            method: "DELETE",
          };
        }
        return {
          url: `/experiences/academic/${id}`,
          method: "DELETE",
        };
      },
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
