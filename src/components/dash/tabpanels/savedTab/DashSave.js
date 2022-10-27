import { FaPencilAlt,FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteSavedMutation, useGetDashSavedQuery } from "./dashSavedApiSlice";
import { memo } from "react";

const DashSave = ({ savedId }) => {
  const navigate = useNavigate();

  const { saved } = useGetDashSavedQuery("savedList", {
    selectFromResult: ({ data }) => ({
        saved: data?.entities[savedId],
    }),
  });

  const [
    deleteSavedRecipe,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteSavedMutation();

  if(isDelSuccess){
    console.log("başarılı bir şekilde silindi")
}else if (isDelError){
      console.log("tarif silinemedi", delError)
  }
  
  if (saved) {
    // const handleEdit = () => navigate(`/dash/blogs/${blogId}`);

    const handleDelete = async () => {
      await deleteSavedRecipe(savedId);
    };


    return (
      <div className="flex flex-col w-full rounded-xl gap-4 border border-orange-500 bg-orange-100">
        <div className="flex">
          <Link className="w-full" to={`/recipes/${savedId}`}>
            <img
              className="object-cover object-center h-32 rounded-xl"
              src={`${saved.image}`}
              alt=""
            />
          </Link>
          <div className="flex flex-col justify-between w-full px-1">
            <div className="flex justify-between">
              <div></div>
              <div className="">
                {/* <button className="" onClick={handleEdit}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button> */}
                <button className="" onClick={handleDelete}>
                  <FaTrash  />
                </button>
              </div>
            </div>
            <div className="break-all text-gray-600">{saved?.title.substring(0, 67)}...</div>
            <div className="flex justify-between items-center">
              <span className=" pr-6 border-r-2 border-gray-300 h-6 text-gray-400 ">{saved?.createdAt.substring(0,10)}</span>
              <span className="pb-1">
                <Link to={`/profile/blogger/${saved?.user._id}`}>
                <img
                  className="h-8 w-8 rounded-full object-cover object-center border border-orange-300 shadow-md"
                  src={saved?.user.image}
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

const memoizedSaved = memo(DashSave);

export default memoizedSaved;
