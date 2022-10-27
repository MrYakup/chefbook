import { useGetRecipesQuery } from "./recipesApiSlice";
import Recipe from "./Recipe";
import PulseLoader from "react-spinners/PulseLoader";

const RecipeList = () => {
  const {
    data: recipes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRecipesQuery("recipesList", {
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
    const { ids } = recipes;

    const tableContent =
      ids?.length && ids.map((recipeId) => <Recipe key={recipeId} recipeId={recipeId} />);

    content = (
      <div className="max-h-screen overflow-y-scroll">
        <div className="mx-2">
          <div className="flex flex-col gap-4">{tableContent}</div>
        </div>
      </div>
    );
  }

  return content;
};
export default RecipeList;
