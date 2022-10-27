import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
//for avatar
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function ProfileModal({
  selectedChat,
  getSenderFull,
  onlineUsers
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 

  //for avatar
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: `${onlineUsers.some((u)=>u._id === getSenderFull._id) ?"green":"gray" }`,
      // color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: `${onlineUsers.some((u)=>u._id === getSenderFull._id) ?"1px solid currentColor":"" }` ,
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  return (
    <div>
      <Button onClick={handleClickOpen}>
        {!selectedChat.isGroupChat ? (
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar alt="" src={`${getSenderFull.image}`} />
          </StyledBadge>
        ) : (
          <img
            className="w-11 h-11  rounded-full border-2 "
            src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt=""
          />
        )}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        // aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle >
          <div
            className="py-1 flex justify-center"
            style={{ cursor: "move" }}
            id="draggable-dialog-title"
          >
            hold and drag
          </div>
          {!selectedChat.isGroupChat ? (
            <img
              className="rounded-md h-60 w-full object-cover object-center"
              src={`${getSenderFull.image}`}
              alt=""
            />
          ) : (
            <img
              className="w-11 h-11  rounded-full border-2 "
              src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt=""
            />
          )}
        </DialogTitle>
        <DialogContent>
          
          {!selectedChat.isGroupChat && (
            <DialogContentText>
              {getSenderFull.email}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions sx={{display:"flex", alignItems:"center"}}>
          <button className="shadow-md px-1 text-gray-500 mr-2 " autoFocus onClick={handleClose}>
            Cancel
          </button>
          {!selectedChat.isGroupChat && (
            <Link
            className="shadow-md px-1 text-gray-500"
              to={`/profile/blogger/${getSenderFull._id}`}
              onClick={handleClose}
            >
              Go to profile
            </Link>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
