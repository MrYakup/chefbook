import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { useGetDashBlogsQuery } from "./dashBlogsApiSlice";
import DashBlog from "./DashBlog";

function DashBlogs() {


  const {
    data: dashBlogs,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetDashBlogsQuery("dashBlogsList", {
    // pollingInterval: 15000,
    // refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  // console.log("dashBlogs", dashBlogs)

  let content;

  if (isLoading) content = <PulseLoader color={"#FFF"} />;

  if (isError) {
    content = (
      <div className="flex justify-center items-center w-full h-full">
        <p className="text-2xl">{error?.data?.message}</p>
      </div>
    );
  }

  if (isSuccess) {
    const { ids } = dashBlogs;

    const tableContent =
      ids?.length && ids.map((blogId) => <DashBlog key={blogId} blogId={blogId} />);

    content = (
      <div className="h-screen">
        <div className="mx-2 my-4 ">
          <div className="flex flex-col gap-4">{tableContent?.length ? tableContent : <div className="flex justify-center items-center min-h-[40vh] text-2xl text-gray-600">içerik yok</div>}</div>
        </div>
      </div>
    );
  }

  return content;
}

export default DashBlogs;
