import { Link, useNavigate } from "react-router-dom";
import { useDeleteRecipeMutation, useGetRecipesQuery } from "./recipesApiSlice";
import { memo } from "react";
import Quickview from "./Quickview";

const Recipe = ({ recipeId }) => {
  // const navigate = useNavigate();

  const { recipe } = useGetRecipesQuery("recipesList", {
    selectFromResult: ({ data }) => ({
        recipe: data?.entities[recipeId],
    }),
  });

  // const [
  //   deleteRecipe,
  //   { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  // ] = useDeleteRecipeMutation();

  if (recipe) {
    // const handleEdit = () => navigate(`/dash/recipes/${recipeId}`);

    // const handleDelete = async () => {
    //   await deleteRecipe({ id: recipeId });
    // };

    return (
      <div className="flex flex-col w-full rounded-xl gap-4 border border-orange-200 bg-orange-100 shadow-md ">
        <div className="flex">
          <Link className="w-full relative" to={`/recipes/${recipe._id}`} >
            <img
              className="object-cover object-center h-full rounded-xl "
              src={`${recipe.image}`}
              alt=""
            />
          </Link>
          <div className="flex flex-col justify-between w-full px-1">
            {/* <div className="flex justify-between">
              <div></div>
              <div className="flex gap-2">
                <button className="" onClick={handleEdit}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button className="" onClick={handleDelete}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div> */}
            
            <Quickview recipe={recipe} />
            
            <div className="break-all text-gray-600">{recipe?.title.substring(0, 67)}</div>
            <div className="break-all text-gray-600">{recipe?.content.substring(0, 36)}...</div>
            <div className="flex justify-between items-center">
              <span className=" pr-6 border-r-2 border-gray-300 h-6 text-gray-400 ">{recipe?.createdAt.substring(0,10)}</span>
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

const memoizedRecipe = memo(Recipe);

export default memoizedRecipe;
