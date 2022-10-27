import React from "react";
import { Link, useParams, useNavigate  } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { useGetBlogsQuery } from "./blogsApiSlice";
import ReplyIcon from '@mui/icons-material/Reply';

function BlogDetail() {
  const { id } = useParams();
 const navigate = useNavigate();
  

  const { blog } = useGetBlogsQuery("blogsList", {
    selectFromResult: ({ data }) => ({
      blog: data?.entities[id],
    }),
  });

  if (!blog)
    return (
      <div className="h-96 flex justify-center items-center">
        <PulseLoader color={"red"} />
      </div>
    );
    
  return (
    <div>
      <div className="pl-1"><Link onClick={()=> navigate(-1)} to="" ><ReplyIcon sx={{ width:"36px", height:"auto" }} /></Link></div>
        
      <div className="flex justify-around items-center"><span>{blog?.createdAt.substring(0,10)}</span><Link to="" > <img className="object-cover object-center h-10 w-10 rounded-full border border-orange-300" src={blog?.user.image} alt="" /></Link></div>
      <div className="flex justify-center text-2xl font-bold text-orange-400 ">{blog?.title}</div>
      <div className="mx-2"><img className="object-cover object-center rounded-md h-48 w-full" src={blog?.image} alt="" /></div>
      <div>
        <p>{blog?.content}</p>
      </div>
    </div>
  );
}

export default BlogDetail;
