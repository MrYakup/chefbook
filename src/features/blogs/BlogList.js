import { useGetBlogsQuery } from "./blogsApiSlice";
import Blog from "./Blog";
import PulseLoader from "react-spinners/PulseLoader";
import SearchBar from "./SearchBar";

const BlogList = () => {
  const {
    data: blogs,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetBlogsQuery("blogsList", {
    // pollingInterval: 15000,
    // refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  
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
    const { ids } = blogs;

    const tableContent =
      ids?.length && ids.map((blogId) => <Blog key={blogId} blogId={blogId} />);

    content = (
      <div className="h-screen">
        <div className="">
          <SearchBar/>
        </div>
        <div className="mx-2">
          <div className="flex flex-col gap-4">{tableContent}</div>
        </div>
        <div className=""></div>
      </div>
    );
  }

  return content;
};
export default BlogList;
