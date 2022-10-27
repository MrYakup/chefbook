import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const profileRecipesAdapter = createEntityAdapter({
  sortComparer: (a,b) => b.createdAt.localeCompare(a.createdAt)
});

const initialState = profileRecipesAdapter.getInitialState();

export const profileRecipesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfileRecipes: builder.query({
      query: (id) => ({
        url: `/profile/blogger/recipes/${id}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedProfileRecipes = responseData.map((profileRecipe) => {
          profileRecipe.id = profileRecipe._id;
          return profileRecipe;
        });
        return profileRecipesAdapter.setAll(initialState, loadedProfileRecipes);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "ProfileRecipe", id: "LIST" },
            ...result.ids.map((id) => ({ type: "ProfileRecipe", id })),
          ];
        } else return [{ type: "ProfileRecipe", id: "LIST" }];
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
  useGetProfileRecipesQuery,
  // useAddNewBlogMutation,
  // useUpdateBlogMutation,
  // useDeleteBlogMutation,
} = profileRecipesApiSlice;

// returns the query result object
export const selectProfileRecipesResult = profileRecipesApiSlice.endpoints.getProfileRecipes.select();

// creates memoized selector
const selectProfileRecipesData = createSelector(
    selectProfileRecipesResult,
  (profileRecipesResult) => profileRecipesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllProfileRecipes,
  selectById: selectProfileRecipeById,
  selectIds: selectProfileRecipeIds,
  // Pass in a selector that returns the blogs slice of state
} = profileRecipesAdapter.getSelectors(
  (state) => selectProfileRecipesData(state) ?? initialState
);
