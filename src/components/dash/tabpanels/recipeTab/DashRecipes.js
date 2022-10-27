import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { useGetDashRecipesQuery } from "./dashRecipesApiSlice";
import DashRecipe from "./DashRecipe";

function DashRecipes() {


  const {
    data: dashRecipes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetDashRecipesQuery("dashRecipesList", {
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
    const { ids } = dashRecipes;

    const tableContent =
      ids?.length && ids.map((recipeId) => <DashRecipe key={recipeId} recipeId={recipeId} />);

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

export default DashRecipes;
