import { Outlet, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import io from "socket.io-client";
import DashHeader from "./dash/DashHeader";
import DashFooter from "./dash/DashFooter";
import { useEffect } from "react";
import { useRefreshMutation } from "../features/auth/authApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { setOnlineUsers } from "../components/chatComponent/chatSlice";

const ENDPOINT = `${process.env.REACT_APP_API}`; // "https://talk-a-tive.herokuapp.com"; -> After deployment
let socket;

const Layout = () => {
  const location = useLocation();
  const [refresh] = useRefreshMutation();
  const token = useSelector(selectCurrentToken);
  
  useEffect(() => {
    const verifyRefreshToken = () => {
      try {
        refresh();
      } catch (err) {
        console.error(err);
      }
    };

    if (!token) verifyRefreshToken();

    // eslint-disable-next-line
  }, []);

  const dispatch = useDispatch();
  
  if (token) {
    var decoded = jwt_decode(token);
  }

  useEffect(() => {
    socket = io(ENDPOINT);
    if (token) {
      socket.emit("new-active-user", decoded?.UserInfo.id);
      socket.on("all-active-users", (allOnlineUsers) => {
        dispatch(setOnlineUsers(allOnlineUsers));
      });
    }
  }, [dispatch, decoded?.UserInfo.id, token]);

  return (
    <>
      {location?.pathname !== "/dash/chat" && <DashHeader />}
      <div className="min-h-[81vh]">
        <Outlet />
      </div>
      {location?.pathname !== "/dash/chat" && <DashFooter />}
      
    </>
  );
};
export default Layout;
