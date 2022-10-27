import { Link, useParams } from "react-router-dom";
import { memo } from "react";
import { useGetProfileBlogsQuery } from "../profileBlogsApiSlice";
import { BsBookmarkHeart,BsHeart,BsChatDots } from "react-icons/bs";

const BlogTab = ({ blogId }) => {
  const { id } = useParams();
  const { blog } = useGetProfileBlogsQuery(id, {
    selectFromResult: ({ data }) => ({
      blog: data?.entities[blogId],
    }),
  });

  if (blog) {
    return (
      <div className="flex flex-col w-full rounded-xl gap-4 border border-orange-500 bg-orange-100">
        <div className="flex flex-col">
          <Link className="w-full" to={`/blogs/${blogId}`}>
            <img
              className="object-cover object-center h-52 w-full rounded-t-xl"
              src={`${blog.image}`}
              alt=""
            />
          </Link>
          <div className="flex justify-between p-2">
            <div className="flex gap-3 items-end">
          <BsHeart style={{ fontSize:"30px" }} />
          <BsChatDots style={{ fontSize:"30px", alignSelf:"flex-start" }} />
            </div>
          <BsBookmarkHeart style={{ fontSize:"32px" }}/>
          </div>
          <div className="flex justify-between w-full px-2 pb-2">
            <div className="break-all text-gray-600">
              {blog?.title.substring(0, 67)}...
            </div>
            <div className="flex justify-between items-center">
              <span className="h-6 text-gray-400 ">
                {blog?.createdAt.substring(0, 10)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  } else return null;
};

const memoizedBlog = memo(BlogTab);

export default memoizedBlog;
