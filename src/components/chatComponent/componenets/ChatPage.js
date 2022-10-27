import { useState } from "react";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { setSelectedChat, setChats, setNotification } from "../chatSlice";
import { selectCurrentToken } from "../../../features/auth/authSlice";
import SideDrawer from "../subcomponents/SideDrawer";
import MyChats from "../subcomponents/MyChats";
import SingleChat from "../subcomponents/SingleChat";

function ChatPage() {
  const token = useSelector(selectCurrentToken);
  const chats = useSelector((state) => state.chat.chats);
  const selectedChat = useSelector((state) => state.chat.selectedChat);
  const notification = useSelector((state) => state.chat.notification);

  const [fetchAgain, setFetchAgain] = useState(false);

  if (token) {
    var decoded = jwt_decode(token);
    var user = decoded?.UserInfo;
  }
  // console.log("chatuser", user)
  return (
    <div className="flex flex-col">
      {user && (
        <SideDrawer
          user={user}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          chats={chats}
          setChats={setChats}
        />
      )}
      <div className="">
        {user && (
          <MyChats
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            user={user}
            chats={chats}
            setChats={setChats}
            fetchAgain={fetchAgain}
          />
        )}
        {user && (
          <SingleChat
            user={user}
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            notification={notification}
            setNotification={setNotification}
          />
        )}
      </div>
    </div>
  );
}

export default ChatPage;
