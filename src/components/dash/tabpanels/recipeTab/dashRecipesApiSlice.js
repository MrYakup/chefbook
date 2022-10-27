import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../../app/api/apiSlice";

const dashRecipesAdapter = createEntityAdapter({
  sortComparer: (a,b) => b.createdAt.localeCompare(a.createdAt)
});

const initialState = dashRecipesAdapter.getInitialState();

export const dashRecipesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashRecipes: builder.query({
      query: () => ({
        url: `/dash/recipes`,
        validateStatus: (response, result) => {
          // console.log("ress",result)
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedDashRecipes = responseData.dashRecipes.map((dashRecipe) => {
            dashRecipe.id = dashRecipe._id;
          return dashRecipe;
        });
        return dashRecipesAdapter.setAll(initialState, loadedDashRecipes);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "DashRecipe", id: "LIST" },
            ...result.ids.map((id) => ({ type: "DashRecipe", id })),
          ];
        } else return [{ type: "DashRecipe", id: "LIST" }];
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
  useGetDashRecipesQuery,
  // useAddNewBlogMutation,
  // useUpdateBlogMutation,
  // useDeleteBlogMutation,
} = dashRecipesApiSlice;

// returns the query result object
export const selectDashRecipesResult = dashRecipesApiSlice.endpoints.getDashRecipes.select();

// creates memoized selector
const selectDashRecipesData = createSelector(
    selectDashRecipesResult,
  (dashRecipesResult) => dashRecipesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllDashRecipes,
  selectById: selectDashRecipeById,
  selectIds: selectDashRecipeIds,
  // Pass in a selector that returns the notes slice of state
} = dashRecipesAdapter.getSelectors(
  (state) => selectDashRecipesData(state) ?? initialState
);
