import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const profileBlogsAdapter = createEntityAdapter({
  sortComparer: (a,b) => b.createdAt.localeCompare(a.createdAt)
});

const initialState = profileBlogsAdapter.getInitialState();

export const profileBlogsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfileBlogs: builder.query({
      query: (id) => ({
        url: `/profile/blogger/blogs/${id}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedProfileBlogs = responseData.map((profileBlog) => {
          profileBlog.id = profileBlog._id;
          return profileBlog;
        });
        return profileBlogsAdapter.setAll(initialState, loadedProfileBlogs);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "ProfileBlog", id: "LIST" },
            ...result.ids.map((id) => ({ type: "ProfileBlog", id })),
          ];
        } else return [{ type: "ProfileBlog", id: "LIST" }];
      },
    }),
    // addNewBlog: builder.mutation({
    //   query: (initialBlog) => ({
    //     url: "/blogs",
    //     method: "POST",
    //     body: {
    //       ...initialBlog,
    //     },
    //   }),
    //   invalidatesTags: [{ type: "Blog", id: "LIST" }],
    // }),
    // updateBlog: builder.mutation({
    //   query: (initialBlog) => ({
    //     url: "/blogs",
    //     method: "PATCH",
    //     body: {
    //       ...initialBlog,
    //     },
    //   }),
    //   invalidatesTags: (result, error, arg) => [{ type: "Blog", id: arg.id }],
    // }),
    // deleteBlog: builder.mutation({
    //   query: ({ id }) => ({
    //     url: `/blogs`,
    //     method: "DELETE",
    //     body: { id },
    //   }),
    //   invalidatesTags: (result, error, arg) => [{ type: "Blog", id: arg.id }],
    // }),
  }),
});

export const {
  useGetProfileBlogsQuery,
  // useAddNewBlogMutation,
  // useUpdateBlogMutation,
  // useDeleteBlogMutation,
} = profileBlogsApiSlice;

// returns the query result object
export const selectProfileBlogsResult = profileBlogsApiSlice.endpoints.getProfileBlogs.select();

// creates memoized selector
const selectProfileBlogsData = createSelector(
  selectProfileBlogsResult,
  (profileBlogsResult) => profileBlogsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllProfileBlogs,
  selectById: selectProfileBlogById,
  selectIds: selectProfileBlogIds,
  // Pass in a selector that returns the blogs slice of state
} = profileBlogsAdapter.getSelectors(
  (state) => selectProfileBlogsData(state) ?? initialState
);
