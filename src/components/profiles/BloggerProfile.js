import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import BloggerProfileTabs from "./bloggerProfileComponenets/BloggerProfileTabs";
import { useFollowMutation, useGetProfileUserQuery, useUnfollowMutation } from "./profileApiSlice";


function BloggerProfile() {
  const { id } = useParams();
  // const [userInfo, setUserInfo] = useState();
  // const [userBlogs, setUserBlogs] = useState();
  // const [userRecipes, setUserRecipes] = useState();

  const {
    data: user,
    isLoading: userIsLoading,
    isSuccess: userIsSuccess,
    isError: userIsError,
    error: userError,
  } = useGetProfileUserQuery( id , {
    // pollingInterval: 15000,
    // refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  // console.log("userdata",user)
  const [
    follow,
    { isSuccess: followIsSuccess,
      isError: followIsError,
      error: followError },
  ] = useFollowMutation();

  const handleFollow =  () => {
     follow(id);
  };

  const [
    unfollow,
    { isSuccess: unfollowIsSuccess,
      isError: unfollowIsError,
      error: unfollowError },
  ] = useUnfollowMutation();

  const handleUnfollow =  () => {
     unfollow(id);
  };

  // const fetchContent = () => {
  //   if (id && id !== undefined) {
  //     try {
  //       axios
  //         .get(`${process.env.REACT_APP_API}/profile/blogger/blogs/${id}`)
  //         .then((response) => setUserBlogs(response.data))
  //         .catch((err) => console.log("profileblogs isteği hatası", err));
  //       axios
  //         .get(`${process.env.REACT_APP_API}/profile/blogger/recipes/${id}`)
  //         .then((response) => setUserRecipes(response.data))
  //         .catch((err) => console.log("profilerecipes isteği hatası", err));
  //     } catch (error) {
  //       return console.log("profile userContent get hatası");
  //     }
  //   } else {
  //     console.log("id verisi yok");
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   if (userInfo?.inFollowers) {
  //     return fetchContent();
  //   } else {
  //     console.log("içeriğin çekilmesi için takip et");
  //   }
  // }, [userInfo]);

 
  return (
    <div className="h-full">
      <Toaster />
      <div className="bg-gradient-to-t from-gray-300 pt-4">
        <div className="grid grid-cols-2">
          <div className="w-20 h-20 place-self-end">
            <img
              className={`w-full h-full object-center object-cover rounded-full border-2 border-white ${
                user?.inFollowers && "hover:scale-[350%] transition-all"
              } `}
              src={user?.userInfo.image}
              alt=""
            />
          </div>

          <div className="pl-12 flex items-center gap-x-4 ">
            <span className="flex flex-col items-center">
              <span className="font-bold">
                {user?.userInfo.followers.length}
              </span>
              <span className="text-gray-600">takipçi</span>
            </span>
            <span className="flex flex-col items-center">
              <span className="font-bold">
                {user?.userInfo.followings.length}
              </span>
              <span className="text-gray-600">takip</span>
            </span>
          </div>
        </div>
        <div className="font-bold text-gray-600 text-center pr-24 py-1">
          <span className="">{user?.userInfo?.name}</span>
        </div>
        <div className="flex justify-center gap-2 pb-2">
          {user?.inFollowers ? (
            <button
              className="bg-red-500 p-2 rounded-lg text-white hover:bg-red-800 hover:shadow-md"
              onClick={handleUnfollow}
            >
              <span className="flex gap-2 justify-between items-center">
                unfollow <PersonRemoveIcon className="h-6" />
              </span>
            </button>
          ) : (
            <button
              className="bg-indigo-600  p-2 px-3 rounded-lg text-white hover:bg-indigo-800 hover:shadow-md"
              onClick={handleFollow}
            >
              <span className="flex gap-2 justify-between items-center">
                follow <PersonAddIcon className="h-6" />
              </span>
            </button>
          )}
          {user?.inFollowers ? (
            " "
          ) : (
            <p className="bg-gray-800 text-white p-2 rounded-lg flex gap-1">
              <span>{user?.contentLength}</span>
              <span>içerik</span>
            </p>
          )}
          {user?.inFollowers && (
            <Link
              to="/dash/chat"
              className=" bg-gray-800 text-white p-2 rounded-lg hover:bg-gray-700 hover:shadow-md"
            >
              {" "}
              message
            </Link>
          )}
        </div>
      </div>
      {user?.inFollowers ? (
        <div className="w-full">
        <BloggerProfileTabs />
        </div>
      ) : (
        <div className=" flex justify-center items-center h-96">
          <p className="text-3xl text-center text-red-500">
            Gizli Profil, içeriği görmek için takip et
          </p>
        </div>
      )}
    </div>
  );
}

export default BloggerProfile;
