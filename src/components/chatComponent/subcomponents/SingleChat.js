import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";

import { CircularProgress, FormControl } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

import UpdateGroupChatModal from "./UpdateGroupChatModal";
import ScrollableChat from "./ScrollableChat";
import ChatBoxTopUserProfile from "./ChatBoxTopUserProfile";
import { getSender, getSenderFull } from "../config/ChatLogics";

const ENDPOINT = `${process.env.REACT_APP_API}`; // "https://talk-a-tive.herokuapp.com"; -> After deployment
let socket, selectedChatCompare;
axios.defaults.withCredentials = true;
function SingleChat({
  user,
  fetchAgain,
  setFetchAgain,
  selectedChat,
  setSelectedChat,
  notification,
  setNotification,
}) {
  const onlineUsers = useSelector((state) => state.chat.onlineUsers);
  const dispatch = useDispatch();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [typingChat, setTypingChat] = useState("");
  const [typingUser, setTypingUser] = useState(null);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${user.token}`,
      //   },
      // };

      setLoading(true);

      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/message/${selectedChat._id}`,
        {
          withCredentials: true,
        }
        // config
      );
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.log("fetchMessages hatası");
    }
  };

  const sendMessage = async () => {
    if (newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        // const config = {
        //   headers: {
        //     "Content-type": "application/json",
        //     Authorization: `Bearer ${user.token}`,
        //   },
        // };
        setNewMessage("");
        const { data } = await axios.post(
          `${process.env.REACT_APP_API}/api/message`,
          {
            content: newMessage,
            chatId: selectedChat,
          },
          {
            withCredentials: true,
          }
          // config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        console.log("sendMessage Hatası");
      }
    } else {
      console.log("göndermek için bişeyler yazın");
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT, {
      withCredentials: true,
    });
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", (room, typingUserId) => {
      setTypingUser(typingUserId);
      setTypingChat(room);
      setIsTyping(true);
    });
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        //give notification
        if (!notification.includes(newMessageRecieved)) {
          dispatch(setNotification([newMessageRecieved, ...notification]));
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);

      socket.emit("typing", selectedChat._id, user.id);
    }

    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const handleExit = () => {
    dispatch(setSelectedChat(""));
  };

  return (
    <div className={`${selectedChat ? "" : "hidden"} bg-[#E8E8E8] h-screen`}>
      {selectedChat ? (
        <div className="flex flex-col">
          <div className="flex items-center w-full px-2 bg-[#16997d]">
            <div className="">
              <IconButton size="large" onClick={handleExit}>
                <ArrowBackIosNewRoundedIcon />
              </IconButton>
            </div>
            <div className="w-full">
              {messages &&
                (!selectedChat.isGroupChat ? (
                  <div className="w-full flex items-center justify-end pt-1">
                    <p className="bg-[#B9F5D0]  rounded-t-xl rounded-l-xl p-1 self-start">
                      {getSender(user, selectedChat.users)}
                    </p>
                    <ChatBoxTopUserProfile
                      selectedChat={selectedChat}
                      getSenderFull={getSenderFull(user, selectedChat.users)}
                      onlineUsers={onlineUsers}
                    />
                  </div>
                ) : (
                  <div className="flex w-full items-center justify-between pl-2">
                    <div className="py-1  px-2 text-xl text-center font-semibold text-white">
                      {selectedChat.chatName.toUpperCase()}
                    </div>
                    <UpdateGroupChatModal
                      fetchMessages={fetchMessages}
                      fetchAgain={fetchAgain}
                      setFetchAgain={setFetchAgain}
                      user={user}
                      selectedChat={selectedChat}
                      setSelectedChat={setSelectedChat}
                    />
                  </div>
                ))}
            </div>
          </div>

          <div className="">
            {loading ? (
              <CircularProgress
                sx={{
                  position: "absolute",
                  top: "47%",
                  left: "47%",
                }}
              />
            ) : (
              <div className="h-[84vh]">
                <ScrollableChat user={user} messages={messages} />
                <div className="w-full fixed bottom-6">
                  {istyping &&
                    selectedChat._id === typingChat &&
                    user.id !== typingUser && (
                      <div className="h-7 flex gap-1 items-center pl-4">
                        <div className=" text-gray-500 inline-flex ">
                          yazıyor
                        </div>
                        <div className="inline-block self-end">
                          <PulseLoader color={"gray"} size={"8px"} />
                        </div>
                      </div>
                    )}
                  <div className="flex px-2 pl-4 items-center">
                    <input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => typingHandler(e)}
                      className="bg-white py-2 rounded-xl indent-2 outline-none mt-1 w-full"
                    />
                    <IconButton size="small" onClick={sendMessage}>
                      <SendRoundedIcon
                        fontSize="large"
                        className="text-[#16997d]"
                      />
                    </IconButton>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full ">
          <p className="text-3xl pb-3 ">Click on a user to start chatting </p>
        </div>
      )}
    </div>
  );
}

export default SingleChat;
