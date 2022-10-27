import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../../app/api/apiSlice";

const dashSavedAdapter = createEntityAdapter({
  sortComparer: (a,b) => b.createdAt.localeCompare(a.createdAt)
});

const initialState = dashSavedAdapter.getInitialState();

export const dashSavedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashSaved: builder.query({
      query: () => ({
        url: `/dash/savedrecipes`,
        validateStatus: (response, result) => {
          // console.log("ress",result)
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedDashSaved = responseData.map((dashSave) => {
            dashSave.id = dashSave._id;
          return dashSave;
        });
        return dashSavedAdapter.setAll(initialState, loadedDashSaved);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "DashSaved", id: "LIST" },
            ...result.ids.map((id) => ({ type: "DashSaved", id })),
          ];
        } else return [{ type: "DashSaved", id: "LIST" }];
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
    deleteSaved: builder.mutation({
      query: ( savedId ) => ({
        url: `/recipes/removeRecipe/${savedId}`,
        method: "POST"
      }),
      invalidatesTags: (result, error, arg) => [{ type: "DashSaved", id: arg.id }],
    }),
  }),
});

export const {
  useGetDashSavedQuery,
  // useAddNewBlogMutation,
  // useUpdateBlogMutation,
  useDeleteSavedMutation,
} = dashSavedApiSlice;

// returns the query result object
export const selectDashSavedResult = dashSavedApiSlice.endpoints.getDashSaved.select();

// creates memoized selector
const selectDashSavedData = createSelector(
    selectDashSavedResult,
  (dashSavedResult) => dashSavedResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllDashSaved,
  selectById: selectDashSavedById,
  selectIds: selectDashSavedIds,
  // Pass in a selector that returns the notes slice of state
} = dashSavedAdapter.getSelectors(
  (state) => selectDashSavedData(state) ?? initialState
);
