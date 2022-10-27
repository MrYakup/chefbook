import { useParams } from "react-router-dom";
import EditBlogForm from "./EditBlogForm";
import { useGetBlogsQuery } from "./blogsApiSlice";
// import useAuth from "../../hooks/useAuth";
import PulseLoader from "react-spinners/PulseLoader";
import useTitle from "../../hooks/useTitle";

const EditBlog = () => {
  useTitle("blogs: Edit Blog");

  const { id } = useParams();

//   const { username, isManager, isAdmin } = useAuth();

  const { blog } = useGetBlogsQuery("blogsList", {
    selectFromResult: ({ data }) => ({
      blog: data?.entities[id],
    }),
  });

  if (!blog)
    return (
      <div className='h-96 flex justify-center items-center'>
        <PulseLoader color={"red"} />
      </div>
    );

//   if (!isManager && !isAdmin) {
//     if (blog.username !== username) {
//       return <p className="errmsg">No access</p>;
//     }
//   }

  const content = <EditBlogForm blog={blog} />;

  return content;
};
export default EditBlog;
