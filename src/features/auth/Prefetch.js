import { store } from '../../app/store'
import { blogsApiSlice } from '../blogs/blogsApiSlice'
import { usersApiSlice } from '../users/usersApiSlice';
import { profileBlogsApiSlice } from '../../components/profiles/profileBlogsApiSlice'
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {

    useEffect(() => {
        // store.dispatch(blogsApiSlice.util.prefetch('getBlogs', 'blogsList', { force: true }))
        // store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
        // store.dispatch(profileBlogsApiSlice.endpoints.getProfileBlogs.initiate())

    }, [])

    return <Outlet />
}
export default Prefetch
