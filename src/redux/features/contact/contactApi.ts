import { baseApi } from "../../api/baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: ({ page = 1, limit = 10, search = "", markAsRead = "" }) => {
        const params = new URLSearchParams();
        params.append("page", page);
        params.append("limit", limit);
        if (search) params.append("search", search);
        if (markAsRead) params.append("markAsRead", markAsRead);

        return {
          url: `/contacts?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Contacts"],
    }),
    getContactById: builder.query({
      query: ({ id }) => ({
        url: `/contacts/${id}`,
        method: "GET",
      }),
      providesTags: ["Contacts"],
    }),
    markAsRead: builder.mutation({
      query: ({ id }) => ({
        url: `/contacts/${id}`,
        method: "PUT",
        body: { markAsRead: true },
      }),
      invalidatesTags: ["Contacts"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetContactsQuery,
  useGetContactByIdQuery,
  useMarkAsReadMutation,
} = contactApi;
export default contactApi;
