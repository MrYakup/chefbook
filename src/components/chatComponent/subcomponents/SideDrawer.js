import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import ProfileModal from "./ProfileModal";

import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#09bf97",
  // "&:hover": {
  //   backgroundColor: "#09bf97",
  // },
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
  color: "black",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    // width: "100%",
    // [theme.breakpoints.up("md")]: {
    width: "1px",
    "&:focus": {
      width: "20ch",
    },
    // },
  },
}));

const ENDPOINT = `${process.env.REACT_APP_API}`; // "https://talk-a-tive.herokuapp.com"; -> After deployment
let socket;
axios.defaults.withCredentials = true;
export default function SideDrawer({ user, selectedChat, setSelectedChat, chats, setChats }) {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  useEffect(() => {
    socket = io(ENDPOINT, {
      withCredentials: true,
    });
  }, []);

  const handleSearch = async (e) => {
    // if(!search){
    //   return console.log("arama kaydı yok")
    // }
    try {
      setSearch(e.target.value);
      setLoading(true);
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${user.token}`,
      //   },
      // };
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/users?search=${search}`,
        {
          withCredentials: true,
        }
      ); //,config)
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      setLoading(false);
      console.log("handleSearch hatası", error);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      //     const config = {
      // headers: {
      //   "Content-type": "application/json",
      //   Authorization: `Bearer ${user.token}`,
      // },
      // };
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/chat`,
        { userId },
        { withCredentials: true }
      ); //, config)
      if (!chats.find((c) => c._id === data._id)) {
        dispatch(setChats([data, ...chats]));
      }

      dispatch(setSelectedChat(data));
      setSearch("");
      setLoadingChat(false);
    } catch (error) {
      setLoadingChat(false);
      console.log("accessChat hatası");
    }
  };
 

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "search-account-menu";
  const mobileMenuId = "search-account-menu-mobile";

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
        <ProfileModal handleMenuClose={handleMenuClose} user={user} />
      </MenuItem>
    </Menu>
  );

  return (
    <Box style={{ display:`${selectedChat ? "none" : ""}` }} sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ boxShadow: "none" }}>
        <Toolbar className="bg-[#16997d]">
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search friends..."
              inputProps={{ "aria-label": "search" }}
              value={search}
              onChange={(e) => handleSearch(e)}
              onBlur={()=>{
                setTimeout(() => {
                  setSearch("")
                }, 600);
              }}
            />
          </Search>
          <div className="z-10">
            {loading ? (
              <div className="flex justify-center items-center text-2xl absolute w-52 h-60 text-black bg-gray-100 rounded-xl left-10 top-14 pl-2">
                yükleniyor...
              </div>
            ) : (
              search?.length > 0 && (
                <div className="absolute w-52 h-auto min-h-full text-black bg-gray-100 rounded-xl left-10 top-14 p-2">
                  <ul className="flex flex-col gap-2">
                    {searchResult?.map((user) => (
                      <li
                        key={user._id}
                        className="bg-[#1976d249] flex items-center gap-2 rounded-md hover:scale-105 hover:shadow-md transition-all"
                      >
                        <img
                          className="h-8 w-8 rounded-full object-cover object-center"
                          src={`${user.image}`}
                          alt=""
                        />
                        <IconButton
                          size="small"
                          edge="end"
                          aria-label="account of current user"
                          aria-controls={menuId}
                          aria-haspopup="true"
                          onClick={() => accessChat(user._id)}
                          color="inherit"
                        >
                          <Stack direction="row" spacing={2}>
                            {user.name}
                          </Stack>
                        </IconButton>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="small"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <Stack direction="row" spacing={2}>
                <Avatar
                  className="border border-white"
                  alt=""
                  src={`${user?.image}`}
                />
              </Stack>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
