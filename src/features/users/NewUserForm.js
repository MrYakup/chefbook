import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { ROLES } from "../../config/roles";

const USER_REGEX = /^[A-z]{3,20}$/;
const USERNAME_REGEX = /^[A-z0-9]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {

  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [image, setImage] = useState("");
  const [birthday, setBirthday] = useState("");
  const [country, setCountry] = useState("");
  const [roles, setRoles] = useState(["Blogger"]);

  useEffect(() => {
    setValidUsername(USERNAME_REGEX.test(username));
  }, [username]);
  
  useEffect(() => {
    setValidName(USER_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setEmail("");
      setUsername("");
      setPassword("");
      setImage("");
      setBirthday("");
      setCountry("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const onNameChanged = (e) => setName(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onImageChanged = (e) => setImage(e.target.value);
  const onBirthdayChanged = (e) => setBirthday(e.target.value);
  const onCountryChanged = (e) => setCountry(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions, //HTMLCollection
      (option) => option.value
    );
    setRoles(values);
  };

  const canSave = [roles.length, validName, validUsername, validPassword].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ name, email, username, password, image, birthday, country, roles });
    }
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass = !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";

  const content = (
    <div className="h-screen w-full">
      <p className={errClass}>{error?.data?.message}</p>

      <form
        className="flex flex-col w-6/12 mx-auto md:gap-2 border p-4 rounded-xl shadow-lg"
        onSubmit={onSaveUserClicked}
      >
        <div className="flex justify-between items-center shadow-lg">
          <h2>New User</h2>
          <div className="form__action-buttons">
            <button className={`icon-button ${!canSave ? "text-gray-300" : "text-green-400"}`} title="Save" disabled={!canSave}>
              <FaSave />
            </button>
          </div>
        </div>

        <label className="form__label" htmlFor="name">
          name: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`border py-1 rounded-md`}
          id="name"
          name="name"
          type="text"
          autoComplete="off"
          value={name}
          onChange={onNameChanged}
        />

        <label className="form__label" htmlFor="email">
          email: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`border py-1 rounded-md`}
          id="name"
          name="email"
          type="email"
          autoComplete="off"
          value={email}
          onChange={onEmailChanged}
        />

        <label className="form__label" htmlFor="username">
          Username: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`border py-1 rounded-md ${validUserClass}`}
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={onUsernameChanged}
        />

        <label className="form__label" htmlFor="password">
          Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
        </label>
        <input
          className={`border py-1 rounded-md ${validPwdClass}`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onPasswordChanged}
        />
        <label className="" htmlFor="image">
          image:
        </label>
        <input
          className={`border py-1 rounded-md`}
          id="image"
          name="image"
          type="text"
          autoComplete="off"
          value={image}
          onChange={onImageChanged}
        />
        <div className="flex justify-between">
          <div className="flex flex-col">
        <label className="form__label" htmlFor="birthday">
        birthday:
        </label>
        <input
          className={`border py-1 rounded-md`}
          id="birthday"
          name="birthday"
          type="text"
          value={birthday}
          onChange={onBirthdayChanged}
        />
        </div>
        <div className="flex flex-col">
        <label className="form__label" htmlFor="country">
        country:
        </label>
        <input
          className={`border py-1 rounded-md`}
          id="country"
          name="country"
          type="text"
          value={country}
          onChange={onCountryChanged}
        />
        </div>
        </div>
        <label className="form__label" htmlFor="roles">
          ASSIGNED ROLES:
        </label>
        <select
          id="roles"
          name="roles"
          className={`form__select ${validRolesClass}`}
          multiple={true}
          size="3"
          value={roles}
          onChange={onRolesChanged}
        >
          {options}
        </select>
      </form>
    </div>
  );

  return content;
};
export default NewUserForm;
