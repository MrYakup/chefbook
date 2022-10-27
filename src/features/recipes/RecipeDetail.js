import React from "react";
import { Link, useParams, useNavigate  } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { useGetRecipesQuery } from "./recipesApiSlice";
import ReplyIcon from '@mui/icons-material/Reply';

function RecipeDetail() {
  const { id } = useParams();
 const navigate = useNavigate();
  

  const { recipe } = useGetRecipesQuery("recipesList", {
    selectFromResult: ({ data }) => ({
        recipe: data?.entities[id],
    }),
  });

  if (!recipe)
    return (
      <div className="h-96 flex justify-center items-center">
        <PulseLoader color={"red"} />
      </div>
    );
    
  return (
    <div>
      <div className="pl-1"><Link onClick={()=> navigate(-1)} to="" ><ReplyIcon sx={{ width:"36px", height:"auto" }} /></Link></div>
        
      <div className="flex justify-around items-center"><span>{recipe?.createdAt.substring(0,10)}</span><Link to="" > <img className="object-cover object-center h-10 w-10 rounded-full border border-orange-300" src={recipe?.user.image} alt="" /></Link></div>
      <div className="flex justify-center text-2xl font-bold text-orange-400 ">{recipe?.title}</div>
      <div  className="mx-2"><img  className="object-cover object-center rounded-md h-48 w-full" src={recipe?.image} alt="" /></div>
      <div>
        <p>{recipe?.content}</p>
      </div>
    </div>
  );
}

export default RecipeDetail;
