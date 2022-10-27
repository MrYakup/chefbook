import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const profileAdapter = createEntityAdapter();

const initialState = profileAdapter.getInitialState()

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfileUser: builder.query({
      query: (id) => ({
        url: `/profile/blogger/${id}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
    //   transformResponse: (responseData) => {
    //   const loadedUser = responseData.map(user => {
    //     console.log("userrr",user)
    //       return user
    //   });
    //       return profileAdapter.setAll(initialState, loadedUser)
    //   },
      providesTags: (result, error, arg) => {
          if (result?.ids) {
              return [
                  { type: 'Profile', id: 'LIST' },
                  ...result.ids.map(id => ({ type: 'Profile', id }))
              ]
          } else return [{ type: 'Profile', id: 'LIST' }]
      }
    }),
    follow: builder.mutation({
      query: (id) => ({
        url: `/profile/${id}/follow`,
        method: "PUT",
      }),
      invalidatesTags: [{ type: "Profile", id: "LIST" }],
    }),
    unfollow: builder.mutation({
      query: (id) => ({
        url: `/profile/${id}/unfollow`,
        method: "PUT",
      }),
      invalidatesTags: [{ type: "Profile", id: "LIST" }],
    }),
    // deleteUser: builder.mutation({
    //     query: ({ id }) => ({
    //         url: `/users`,
    //         method: 'DELETE',
    //         body: { id }
    //     }),
    //     invalidatesTags: (result, error, arg) => [
    //         { type: 'User', id: arg.id }
    //     ]
    // }),
  }),
});

export const {
  useGetProfileUserQuery,
  useFollowMutation,
  useUnfollowMutation,
  // useDeleteUserMutation,
} = profileApiSlice;

// returns the query result object
export const selectProfileUserResult = profileApiSlice.endpoints.getProfileUser.select()

// creates memoized selector
const selectProfileUserData = createSelector(
    selectProfileUserResult,
    profileUserResult => profileUserResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllProfileUsers,
    selectById: selectProfileUserById,
    selectIds: selectProfileUserIds
// Pass in a selector that returns the users slice of state
} = profileAdapter.getSelectors(state => selectProfileUserData(state) ?? initialState)
