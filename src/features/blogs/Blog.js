// import { FaPencilAlt,FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDeleteBlogMutation, useGetBlogsQuery } from "./blogsApiSlice";
import { memo } from "react";

const Blog = ({ blogId }) => {
  // const navigate = useNavigate();

  const { blog } = useGetBlogsQuery("blogsList", {
    selectFromResult: ({ data }) => ({
      blog: data?.entities[blogId],
    }),
  });

  // const [
  //   deleteBlog,
  //   { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  // ] = useDeleteBlogMutation();

  if (blog) {
    // const handleEdit = () => navigate(`/dash/blogs/${blogId}`);

    // const handleDelete = async () => {
    //   await deleteBlog({ id: blogId });
    // };

    return (
      <div className="flex flex-col w-full rounded-xl gap-4 border border-orange-500 bg-orange-100">
        <div className="flex">
          <Link className="w-full" to={`/blogs/${blogId}`}>
            <img
              className="object-cover object-center h-32 rounded-xl"
              src={`${blog.image}`}
              alt=""
            />
          </Link>
          <div className="flex flex-col justify-between w-full px-1 overflow-hidden">
            <div className="flex justify-end relative ">
              {/* <div></div>
              <div className="flex gap-2">
                <button className="" onClick={handleEdit}>
                  <FaPencilAlt  />
                </button>
                <button className="" onClick={handleDelete}>
                  <FaTrash  />
                </button>
              </div> */}
              <div className="bg-orange-400 text-gray-100 w-32 h-8 rotate-45 absolute left-24 top-4 text-sm flex items-center justify-center">Most Viewed</div>
            </div>
            <div className="break-all text-gray-600">{blog?.title.substring(0, 67)}...</div>
            <div className="flex justify-between items-center">
              <span className=" pr-6 border-r-2 border-gray-300 h-6 text-gray-400 ">{blog?.createdAt.substring(0,10)}</span>
              <span className="pb-1">
                <Link to={`/profile/blogger/${blog?.user._id}`}>
                <img
                  className="h-8 w-8 rounded-full object-cover object-center border border-orange-300 shadow-md"
                  src={blog?.user.image}
                  alt=""
                />
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  } else return null;
};

const memoizedBlog = memo(Blog);

export default memoizedBlog;
