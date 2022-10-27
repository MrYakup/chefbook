import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isManager = false;
  let isAdmin = false;
  let status = "Blogger";

  // console.log("useAuth-1", token)

  if (token) {
    const decoded = jwtDecode(token);
    const { username, roles } = decoded.UserInfo;
    // console.log("useAuthh",roles)
    isManager = roles.includes("Manager");
    isAdmin = roles.includes("Admin");

    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";
    // console.log("useAuth-2", token)
    return { username, roles, status, isManager, isAdmin };
  } else {
    // console.log("useAuth-3", token)
    return { username: "", roles: [], isManager, isAdmin, status };
  }
};
export default useAuth;
