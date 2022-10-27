import { useState, useEffect } from "react";
import { useUpdateBlogMutation, useDeleteBlogMutation } from "./blogsApiSlice";
import { useNavigate } from "react-router-dom";
import { FaSave,FaTrash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const EditBlogForm = ({ blog }) => {
  const { isManager, isAdmin } = useAuth();

  const [updateBlog, { isLoading, isSuccess, isError, error }] =
    useUpdateBlogMutation();

  const [
    deleteBlog,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteBlogMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [image, setImage] = useState(blog.image);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("");
      setContent("");
      setImage("");
      navigate("/dash/blogs");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onImageChanged = (e) => setImage(e.target.value);

  const canSave = [title, content, image].every(Boolean) && !isLoading;

  const onSaveBlogClicked = async (e) => {
    if (canSave) {
      await updateBlog({ id: blog.id, title, content, image });
    }
  };

  const onDeleteBlogClicked = async () => {
    await deleteBlog({ id: blog.id });
  };

  const created = new Date(blog.createdAt).toLocaleString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const updated = new Date(blog.updatedAt).toLocaleString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const errClass = isError || isDelError ? "errmsg" : "offscreen";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  let deleteButton = null;
  if (isManager || isAdmin) {
    deleteButton = (
      <button
        className="icon-button"
        title="Delete"
        onClick={onDeleteBlogClicked}
      >
        <FaTrash  />
      </button>
    );
  }

  const Content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="flex flex-col pt-8 mx-2 gap-2" onSubmit={(e) => e.preventDefault()}>
        <div className="flex justify-between mx-2">
          <h2 className="text-2xl">Edit Blog </h2>
          <div className="">
            <button
              className=""
              title="Save"
              onClick={onSaveBlogClicked}
              disabled={!canSave}
            >
              <FaSave className={`${canSave ? "text-green-400": "text-red-300" } h-10`}  />
            </button>
            {deleteButton}
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

        <label className="" htmlFor="content">
          Content:
        </label>
        <textarea
          className={`border rounded-md p-1 py-8`}
          id="content"
          name="content"
          value={content}
          onChange={onContentChanged}
        />
        <label className="" htmlFor="image">
          Image:
        </label>
        <input
          className={`border rounded-md p-1`}
          id="image"
          name="image"
          type="text"
          autoComplete="off"
          value={image}
          onChange={onImageChanged}
        />
      </form>
      <div className="flex flex-col items-end mx-6 pt-8">
        <div>created :{created}</div>
        <div>updated:{updated}</div>
      </div>
        
    </>
  );

  return Content;
};

export default EditBlogForm;
