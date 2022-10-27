import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewBlogMutation } from "./blogsApiSlice";
import { FaSave } from "react-icons/fa";

const NewBlogForm = () => {
  const [addNewBlog, { isLoading, isSuccess, isError, error }] =
    useAddNewBlogMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setContent("");
      setImage("");
      navigate("/dash/blogs");
    }
  }, [isSuccess, navigate]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onImageChanged = (e) => setImage(e.target.value);

  const canSave = [title, content, image].every(Boolean) && !isLoading;

  const onSaveBlogClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewBlog({ title, content, image });
    }
  };


  const errClass = isError ? "errmsg" : "offscreen";

  const Content = (
    <div className="flex justify-center items-center h-96">
      <p className={errClass}>{error?.data?.message}</p>

      <form className="flex flex-col border shadow-lg p-8 rounded-xl" onSubmit={onSaveBlogClicked}>
        <div className="flex justify-between items-center shadow-lg ">
          <h2>New Blog</h2>
          <div className="">
            <button className="" title="Save" disabled={!canSave}>
              <FaSave className={`${canSave ? "text-green-400" : "text-red-400"} w-8 h-8`} />
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
      </form>
    </div>
  );

  return Content;
};

export default NewBlogForm;
