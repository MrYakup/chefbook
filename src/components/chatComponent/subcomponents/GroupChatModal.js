import React, { useState } from "react";
import Draggable from "react-draggable";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

import UserListItem from "./UserListItem";
import UserBadgeItem from "./UserBadgeItem";

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
axios.defaults.withCredentials = true;
export default function GroupChatModal({ user, chats, setChats }) {
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      //   const config = {
      //     headers: {
      //       Authorization: `Bearer ${user.token}`,
      //     },
      //   };
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/users?search=${search}`,
        {
          withCredentials: true,
        }
      ); //, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.error("handleSearch hatası");
    }
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast.error("kullanıcı zaten eklendi");
      return;
    } else {
      setSelectedUsers([...selectedUsers, userToAdd]);
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast.error("lütfen grup adını giriniz");
      return;
    }
    if (selectedUsers.length < 2) {
      toast.error("lütfen en az 2 kişi ekleyiniz");
      return;
    }

    try {
      //   const config = {
      //     headers: {
      //       Authorization: `Bearer ${user.token}`,
      //     },
      //   };
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
          withCredentials: true,
        }
        // config
      );

      setChats([data, ...chats]);
      toast.success("yeni grup başarılı bir şekilde oluşturuldu");
      handleClose();
    } catch (error) {
      toast.error("handleSubmit hatası");
    }
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSearchResult([]);
    setSelectedUsers([]);
  };

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <button
        className="bg-blue-500  shadow-md hover:bg-indigo-600 rounded-lg px-2 py-1 flex items-center gap-1 "
        onClick={handleClickOpen}
      >
        <span className="text-white">Group Chat</span>
        <GroupAddIcon className="text-white" />
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle
          style={{ cursor: "move", display: "flex", justifyContent: "center" }}
          id="draggable-dialog-title"
        >
          Create Group Chat
        </DialogTitle>
        <DialogContent style={{ paddingTop: "8px" }}>
          <DialogContentText>{/* {user.name} */}</DialogContentText>
          <div className="flex flex-col gap-2">
          <FormControl className="w-[70vw]">
            <TextField
              label="Chat Name"
              onChange={(e) => setGroupChatName(e.target.value)}
            />
          </FormControl>
          <FormControl className="w-[70vw]">
            <TextField
              label="Add Users"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </FormControl>
          </div>
          <div className="flex w-full flex-wrap">
            {selectedUsers.map((u) => (
              <UserBadgeItem
                key={u._id}
                user={u}
                handleFunction={() => handleDelete(u)}
              />
            ))}
          </div>
          {loading ? (
            <div className="flex justify-center">Loading...</div>
          ) : (
            search &&
            searchResult
              ?.slice(0, 4)
              .map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleGroup(user)}
                />
              ))
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Chat</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
