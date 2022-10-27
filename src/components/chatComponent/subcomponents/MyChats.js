import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';

import { getSender, getSenderFull } from "../config/ChatLogics";
import GroupChatModal from "./GroupChatModal";
import UserProfile from "./UserProfile";
axios.defaults.withCredentials = true;
function MyChats({
  selectedChat,
  setSelectedChat,
  chats,
  setChats,
  fetchAgain,
  user
}) {
  const dispatch = useDispatch();
  const onlineUsers = useSelector((state) => state.chat.onlineUsers);

  const fetchChats = async () => {
    try {
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${user.token}`,
      //   },
      // };

      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/chat`, {
        withCredentials: true,
      }); //, config);
      dispatch(setChats(data));

    } catch (error) {
      console.log("fetch chat hatası",error);
    }
  };

  useEffect(() => {
    fetchChats();
    console.log("chat çekildi")
  }, []);

  return (
    <div  className={`${selectedChat ? "hidden" : ""} h-screen overflow-y-scroll bg-[#E8E8E8]`}>
      <div className="flex justify-between p-2 py-2 bg-[#16997d]">
        <div className="flex gap-1 items-center">
          <ForumRoundedIcon className="text-white" />
          <p className="text-white font-bold text-lg">Chats</p>
        </div>
        <GroupChatModal user={user} chats={chats} setChats={setChats} />
      </div>

      {!chats ? (
        <div className="flex justify-center items-center text-2xl absolute w-52 text-black rounded-xl left-40 top-14 pl-2">
          yükleniyor...
        </div>
      ) : (
        <ul
          className="flex flex-col gap-2 overflow-y-scroll overflow-x-hidden p-2 h-[80%] rounded-b-3xl bg-[#E8E8E8] border-b-gray-300 "
          style={{ scrollbarWidth: "thin" }}
        >
          {chats?.map((chat) => (
            <li
              key={chat._id}
              className={`${selectedChat === chat && "bg-[#38B2AC] "} ${
                chat.isGroupChat && selectedChat === chat && "bg-[#38B2AC]"
              } ${
                chat.isGroupChat && !(selectedChat === chat) && "bg-indigo-100"
              }   flex items-center cursor-pointer rounded-md hover:scale-105 hover:shadow-lg transition-all`}
            >
              <UserProfile
                user={user}
                chat={chat}
                getSenderFull={getSenderFull}
                onlineUsers={onlineUsers}
              />

              <IconButton
                size="small"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={() => dispatch(setSelectedChat(chat))}
              >
                <div
                  className={`${
                    selectedChat === chat ? " text-white" : " text-black"
                  } w-96 `}
                >
                  <Stack direction="row" spacing={2}>
                    {!chat.isGroupChat ? (
                      <p className="font-bold">{getSender(user, chat.users)}</p>
                    ) : (
                      <p className="font-bold">{chat.chatName}</p>
                    )}
                  </Stack>
                  {chat.latestMessage && (
                    <Stack direction="row">
                      <p className="text-base font-bold text-gray-500">
                        {chat.latestMessage.sender.name} :{" "}
                      </p>
                      {chat.latestMessage.content.length > 12 ? (
                        <p className="text-base text-gray-400">
                          {chat.latestMessage.content.substring(0, 6) + ".."}
                        </p>
                      ) : (
                        <p className="text-base text-gray-400">
                          {" "}
                          {chat.latestMessage.content}
                        </p>
                      )}
                    </Stack>
                  )}
                </div>
              </IconButton>
            </li>
          ))}
        </ul>
      )}

     </div>
  );
}

export default MyChats;
