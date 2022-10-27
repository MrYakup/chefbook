import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import HomeIcon from "@mui/icons-material/Home";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import MessageIcon from "@mui/icons-material/Message";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { BsWhatsapp } from "react-icons/bs";


import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Link } from "react-router-dom";


export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [width, setWidth] = React.useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width:
          anchor === "top" || anchor === "bottom" ? "auto" : width ? 200 : 60,
        transition: "all",
        transitionDuration: "700ms"
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link className="flex" to="/">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link className="flex" to="/blogs">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AutoStoriesIcon />
              </ListItemIcon>
              <ListItemText primary={"Blogs"} />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link className="flex" to="/contact">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ContactPhoneIcon />
              </ListItemIcon>
              <ListItemText primary={"Contact"} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>

      <Divider />

      <List>
        <Link className="flex" to="/dash/chat">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BsWhatsapp style={{ fontSize:"24px" }} />
              </ListItemIcon>
              <ListItemText primary={"Message"} />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link className="flex" to="">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsSuggestIcon />
              </ListItemIcon>
              <ListItemText primary={"Settings"} />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link className="flex" to="">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PowerSettingsNewIcon />
              </ListItemIcon>
              <ListItemText primary={"Power-off"} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  return (
    <div >
      {["left"].map((anchor) => (
        <React.Fragment  key={anchor}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            
          >
            <div className="flex justify-end pr-1">
              <IconButton
                size="large"
                color="inherit"
                sx={{ width: "50px" }}
                onClick={() => {
                  setWidth(!width);
                }}
                
              >
                <DoubleArrowIcon
                  sx={{
                    transform: width ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "all",
                    transitionDuration: "700ms",
                  }}
                />
              </IconButton>
            </div>
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
