import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewRecipeMutation } from "./recipesApiSlice";
import { FaSave } from "react-icons/fa";
import { CATEGORIES } from "./categories";

const NewRecipeForm = () => {
  const [addNewRecipe, { isLoading, isSuccess, isError, error }] =
    useAddNewRecipeMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [cookingtime, setCookingtime] = useState("");
  const [category, setCategory] = useState([]);

//   useEffect(() => {
//     if (isSuccess) {
//       setTitle("");
//       setContent("");
//       setImage("");
//       setCookingtime("");
//       setCategory("");
//       navigate("/");
//     }
//   }, [isSuccess, navigate]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onImageChanged = (e) => setImage(e.target.value);
  const onCookingtimeChanged = (e) => setCookingtime(e.target.value);
  const onCategoryChanged = (e) => {
  const values = Array.from(
      e.target.selectedOptions, //HTMLCollection
      (option) => option.value
    );
    setCategory(values);
  };

  const canSave =
    [title, content, image, cookingtime, category].every(Boolean) && !isLoading;

  const onSaveRecipeClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewRecipe({ title, content, image, cookingtime, category });
    }
  };

  const options = Object.values(CATEGORIES).map((category) => {
    return (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";

  const Content = (
    <div className="flex justify-center items-center h-96">
      <p className={errClass}>{error?.data?.message}</p>

      <form
        className="flex flex-col border shadow-lg p-8 rounded-xl"
        onSubmit={onSaveRecipeClicked}
      >
        <div className="flex justify-between items-center shadow-lg ">
          <h2>New Recipe</h2>
          <div className="">
            <button className="" title="Save" disabled={!canSave}>
              <FaSave
                className={`${
                  canSave ? "text-green-400" : "text-red-400"
                } w-8 h-8`}
              />
            </button>
          </div>
        </div>
        <label className="" htmlFor="title">
          Title:
        </label>
        <input
          className={`border rounded-md p-1`}
          id="title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />

        <label className="" htmlFor="text">
          Content:
        </label>
        <textarea
          className={`border p-1 rounded-md`}
          id="content"
          name="content"
          value={content}
          onChange={onContentChanged}
        />
        <label className="" htmlFor="image">
          Image:
        </label>
        <input
          className={`border p-1 rounded-md`}
          id="image"
          name="image"
          type="text"
          autoComplete="off"
          value={image}
          onChange={onImageChanged}
        />
        <label className="" htmlFor="cookingtime">
          cookingtime:
        </label>
        <input
          className={`border p-1 rounded-md`}
          id="cookingtime"
          name="cookingtime"
          type="text"
          autoComplete="off"
          value={cookingtime}
          onChange={onCookingtimeChanged}
        />

        <label className="" htmlFor="category">
          category
        </label>
        <select
          id="category"
          name="category"
          className={``}
          multiple={true}
          size="3"
          value={category}
          onChange={onCategoryChanged}
        >
          {options}
        </select>
      </form>
    </div>
  );

  return Content;
};

export default NewRecipeForm;
