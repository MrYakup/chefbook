import { Link } from "react-router-dom";
import { memo } from "react";
import { useGetDashRecipesQuery } from "./dashRecipesApiSlice";
import { BsBookmarkHeart,BsHeart,BsChatDots } from "react-icons/bs";

const DashRecipe = ({ recipeId }) => {

  const { recipe } = useGetDashRecipesQuery("dashRecipesList", {
    selectFromResult: ({ data }) => ({
        recipe: data?.entities[recipeId],
    }),
  });
  // console.log("sadsa",blog)
  if (recipe) {
    return (
      <div className="flex flex-col w-full rounded-xl gap-4 border border-orange-500 bg-orange-100">
        <div className="flex flex-col w-full">
          <Link className="w-full" to={`/recipes/${recipeId}`}>
            <img
              className="object-cover object-center h-52 w-full rounded-t-xl"
              src={`${recipe.image}`}
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
          <div className="flex justify-between w-full px-2 py-2">
            <div className="break-all text-gray-600">
              {recipe?.title.substring(0, 67)}...
            </div>
            <div className="flex justify-between items-center">
              <span className="h-6 text-gray-400 ">
                {recipe?.createdAt.substring(0, 10)}
              </span>
            </div>
            <div>
            <span className="pb-1">
                <Link to={`/profile/blogger/${recipe?.user._id}`}>
                <img
                  className="h-8 w-8 rounded-full object-cover object-center border border-orange-300 shadow-md"
                  src={recipe?.user.image}
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

const memoizedRecipe = memo(DashRecipe);

export default memoizedRecipe;
