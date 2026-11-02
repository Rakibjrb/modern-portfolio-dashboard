import { baseApi } from "../../api/baseApi";

const projectApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: ({ page = 1, limit = 10, search = "", category = "" }) => {
                const params = new URLSearchParams();
                params.append("page", page);
                params.append("limit", limit);
                if (search) params.append("search", search);
                if (category) params.append("category", category);

                return {
                    url: `/projects?${params.toString()}`,
                    method: "GET",
                }
            },
            providesTags: ["Projects"]
        }),
        createProject: builder.mutation({
            query: (data) => ({
                url: "/projects",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Projects"]
        }),
        updateProject: builder.mutation({
            query: ({ data = {}, id }) => ({
                url: `/projects/${id}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Projects"]
        }),
        deleteProject: builder.mutation({
            query: ({ id }) => ({
                url: `/projects/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Projects"]
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetProjectsQuery,
    useCreateProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation
} = projectApi;
export default projectApi;