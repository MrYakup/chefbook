import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../authSlice";
import { useLoginMutation } from "../authApiSlice";
import usePersist from "../../../hooks/usePersist";
import PulseLoader from "react-spinners/PulseLoader";

const Login = () => {

  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading) return <PulseLoader color={"#FFF"} />;

  const content = (
    <section className="flex items-center justify-center h-96">
      <main className=" rounded-lg p-4 shadow-lg bg-gray-200">
        <p style={{display:"flex", justifyContent:"center", color:"red" }} ref={errRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              className="p-1 rounded-md shadow-sm"
              type="text"
              id="username"
              ref={userRef}
              value={username}
              onChange={handleUserInput}
              autoComplete="off"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              className="p-1 rounded-md shadow-sm"
              type="password"
              id="password"
              onChange={handlePwdInput}
              value={password}
              required
            />
          </div>

          <label htmlFor="persist" className="flex gap-1">
            <input
              type="checkbox"
              className=""
              id="persist"
              onChange={handleToggle}
              checked={persist}
            />
             Trust This Device
          </label>
          <button className=" py-1 rounded-md bg-indigo-500 text-white">
            Sign In
          </button>
        </form>
        <div className="flex justify-center pt-2 w-full">
          <Link className="bg-red-300 rounded-md shadow-md py-2 px-4 text-white" to="/">
            Back to Home
          </Link>
        </div>
      </main>
    </section>
  );

  return content;
};
export default Login;
