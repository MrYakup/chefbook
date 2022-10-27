import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import io from "socket.io-client";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import useAuth from "../../hooks/useAuth";
import PulseLoader from "react-spinners/PulseLoader";
import { FaUsersCog,FaUserPlus,FaSignOutAlt } from "react-icons/fa";

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Avatar } from "@mui/material";
import { Stack } from "@mui/system";
import SwipeableTemporaryDrawer from "./SwipeableTemporaryDrawer";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  // width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    // width: "100%",
    // [theme.breakpoints.up("sm")]: {
    width: "7ch",
    "&:focus": {
      width: "20ch",
    },
    // },
  },
}));

const USERS_REGEX = /^\/dash\/users(\/)?$/;

const ENDPOINT = `${process.env.REACT_APP_API}`; // "https://talk-a-tive.herokuapp.com"; -> After deployment
let socket;

export default function DashHeader() {
  const token = useSelector(selectCurrentToken);
  const [focus, setFocus] = useState(false);

  if (token) {
    var decoded = jwt_decode(token);
  }

  const { isManager, isAdmin } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  const logoutHandle = () => {
    sendLogout();
    handleMenuClose();
  };
  useEffect(() => {
    socket = io(ENDPOINT);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      socket.emit("disconnected-user", decoded?.UserInfo.id);
    }
  }, [isSuccess, navigate]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link className="w-full" to="/dash">Dash</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link className="w-full" to={`/profile/blogger/${decoded?.UserInfo.id}`}>Profile</Link>
      </MenuItem>
      <MenuItem onClick={logoutHandle}>
        <div className="w-full text-base text-center text-red-400  pr-1">
          Sign out
        </div>
        <FaSignOutAlt className="text-red-400" />
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Stack direction="row" spacing={2}>
            <Avatar alt="" src={decoded?.UserInfo.image} />
          </Stack>
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const onNewUserClicked = () => navigate("/dash/users/new");
  const onUsersClicked = () => navigate("/dash/users");

  let newUserButton = null;
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <button
        className="icon-button ml-2"
        title="New User"
        onClick={onNewUserClicked}
      >
        <FaUserPlus />
      </button>
    );
  }

  let userButton = null;
  if (isManager || isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes("/dash")) {
      userButton = (
        <button
          className="icon-button ml-2"
          title="Users"
          onClick={onUsersClicked}
        >
          <FaUsersCog />
        </button>
      );
    }
  }

  const errClass = isError ? "errmsg" : "offscreen";

  let buttonContent;
  if (isLoading) {
    buttonContent = <PulseLoader color={"#FFF"} />;
  } else {
    buttonContent = (
      <>
        {newUserButton}
        {userButton}
      </>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <p className={errClass}>{error?.data?.message}</p>
          <SwipeableTemporaryDrawer />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <div className="relative pb-2">
              <Link to="/">
                <img className="w-16" src="/photos/logo.png" alt="" />

                <p className="text-sm absolute top-12 -rotate-12 bg-green-300">
                  Chef's
                </p>
                <p className="text-sm absolute top-12 left-8 rotate-12 bg-red-300">
                  Book
                </p>
              </Link>
            </div>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          {token ? (
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Stack direction="row" spacing={2}>
                  <Avatar
                    sx={{ border: "1px solid white" }}
                    alt=""
                    src={decoded?.UserInfo.image}
                  />
                </Stack>
              </IconButton>
              {buttonContent}
            </Box>
          ) : (
            focus === false && (
              <Box className="flex gap-2">
                {" "}
                <Link
                  className="py-1 px-3 rounded-md text-lg text-white bg-green-300 shadow-lg hover:shadow-none transition-all"
                  to="/login"
                >
                  login
                </Link>
                <Link
                  className="py-1 px-3 rounded-md text-lg text-white bg-red-300 shadow-lg hover:shadow-none transition-all"
                  to="/register"
                >
                  register
                </Link>
              </Box>
            )
          )}
          {token && (
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
