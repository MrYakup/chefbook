import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../../app/api/apiSlice";

const dashBlogsAdapter = createEntityAdapter({
  sortComparer: (a,b) => b.createdAt.localeCompare(a.createdAt)
});

const initialState = dashBlogsAdapter.getInitialState();

export const dashBlogsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashBlogs: builder.query({
      query: () => ({
        url: `/dash/blogs`,
        validateStatus: (response, result) => {
          // console.log("ress",result)
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedDashBlogs = responseData.dashBlogs.map((dashBlog) => {
          dashBlog.id = dashBlog._id;
          return dashBlog;
        });
        return dashBlogsAdapter.setAll(initialState, loadedDashBlogs);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "DashBlog", id: "LIST" },
            ...result.ids.map((id) => ({ type: "DashBlog", id })),
          ];
        } else return [{ type: "DashBlog", id: "LIST" }];
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
  useGetDashBlogsQuery,
  // useAddNewBlogMutation,
  // useUpdateBlogMutation,
  // useDeleteBlogMutation,
} = dashBlogsApiSlice;

// returns the query result object
export const selectDashBlogsResult = dashBlogsApiSlice.endpoints.getDashBlogs.select();

// creates memoized selector
const selectDashBlogsData = createSelector(
  selectDashBlogsResult,
  (dashBlogsResult) => dashBlogsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllDashBlogs,
  selectById: selectDashBlogById,
  selectIds: selectDashBlogIds,
  // Pass in a selector that returns the notes slice of state
} = dashBlogsAdapter.getSelectors(
  (state) => selectDashBlogsData(state) ?? initialState
);
