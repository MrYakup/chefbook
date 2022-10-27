import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Draggable from "react-draggable";
import toast, { Toaster } from "react-hot-toast";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';

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
export default function GroupChatModal({
  fetchAgain,
  setFetchAgain,
  user,
  selectedChat,
  setSelectedChat,
  fetchMessages,
}) {
  const dispatch = useDispatch();
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user.id && user1.id !== user.id) {
      toast.error("Sadece admin birilerini gruptan atabilir!");
      return;
    }

    try {
      setLoading(true);
      //   const config = {
      //     headers: {
      //       Authorization: `Bearer ${user.token}`,
      //     },
      //   };
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1.id
        },
        {
          withCredentials: true
        }
        // config
      );

          if(user1.id === user.id){
            dispatch(setSelectedChat());
            toast.success("Gruptan ayrıldınız");
          }else{
            dispatch(setSelectedChat(data));
            toast.success(`${user1.name} gruptan atıldı`);
          }

      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      toast.error("handleRemove hatası");
      setLoading(false);
    }
    setGroupChatName("");
  };


  const handleRemoveBadge = async (user1) => {
    if (selectedChat.groupAdmin._id !== user.id && user1._id !== user.id) {
      toast.error("Sadece admin birilerini gruptan atabilir!");
      return;
    }

    try {
      setLoading(true);
      //   const config = {
      //     headers: {
      //       Authorization: `Bearer ${user.token}`,
      //     },
      //   };
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id
        },
        {
          withCredentials: true
        }
        // config
      );

          if(user1._id === user.id){
            dispatch(setSelectedChat());
            toast.success("Gruptan ayrıldınız");
          }else{
            dispatch(setSelectedChat(data));
            toast.success(`${user1.name} gruptan atıldı`);
          }

      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      toast.error("handleRemove hatası");
      setLoading(false);
    }
    setGroupChatName("");
  };


  const handleRename = async () => {
    if (!groupChatName) {
      toast.error("Değiştirmek istediğiniz grup adını giriniz");
      return;
    }

    try {
      setRenameLoading(true);
      //   const config = {
      //     headers: {
      //       Authorization: `Bearer ${user.token}`,
      //     },
      //   };
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName
        },
        {
          withCredentials: true
        }
        // config
      );

      toast.success("Grup adı başarılı bir şekilde güncellendi");
      // setSelectedChat("");
      dispatch(setSelectedChat(data));
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast.error("handleRename hatası");
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

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
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/users?search=${search}`, {
        withCredentials: true,
      }); //, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.error("handleSearch hatası");
      setLoading(false);
    }
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast.error("Kullanıcı zaten grupta!");
      return;
    }

    if (selectedChat.groupAdmin._id !== user.id) {
      toast.error("Sadece admin birilerini gruba alabilir!");
      return;
    }

    try {
      setLoading(true);
      //   const config = {
      //     headers: {
      //       Authorization: `Bearer ${user.token}`,
      //     },
      //   };
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id
        },
        {
          withCredentials: true
        }
        // config
      );
    
      dispatch(setSelectedChat(data));
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast.error("handleAddUser hatası");
      setLoading(false);
    }
    setGroupChatName("");
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSearchResult([]);
    setSearch("");
    setGroupChatName("");
  };

  return (
    <div>
      <Toaster position="bottom-right" reverseOrder={false} />

      <button
        className=" hover:text-indigo-500  text-white rounded-md px-2 py-1  flex items-center gap-1"
        onClick={handleClickOpen}
      >
        {/* <span>Update</span> */}
        <SettingsSuggestRoundedIcon fontSize="large"/>
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle
          style={{ cursor: "move",display:"flex", justifyContent:"center" }}
          id="draggable-dialog-title"
        >
          {selectedChat.chatName}
        </DialogTitle>
        <DialogContent style={{ paddingTop: "6px" }}>
          <div className="flex flex-wrap pb-2">
            {selectedChat.users.map((u) => (
              <UserBadgeItem
                key={u._id}
                user={u}
                admin={selectedChat.groupAdmin}
                handleFunction={() => handleRemoveBadge(u)}
              />
            ))}
          </div>
              <div className="flex flex-col gap-2">
          <FormControl className="w-full " >
            <TextField
              label="Chat Name"
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
            />
          </FormControl>

          <FormControl className="w-full">
            <TextField
              label="Add Users"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </FormControl>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            searchResult?.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => handleAddUser(user)}
              />
            ))
          )}
        </DialogContent>
        <DialogActions>
          <button
            autoFocus
            onClick={handleClose}
            className="bg-red-400 rounded-lg p-1 shadow-md text-white hover:scale-105 hover:bg-red-500 hover:shadow-xl"
          >
            Cancel
          </button>
          <button
            onClick={() => handleRemove(user)}
            className="bg-red-400 rounded-lg p-1 shadow-md text-white hover:scale-105 hover:bg-red-500 hover:shadow-xl"
          >
            Leave Group
          </button>
          <button
            className="bg-[#38B2AC] rounded-lg p-1 shadow-md text-white hover:scale-105 hover:bg-[#329b96] hover:shadow-xl"
            onClick={handleRename}
          >
            Update
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
