import { createSlice } from "@reduxjs/toolkit";



export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    selectedChat: null,
    chats: [],
    notification: [],
    onlineUsers: []
  },
  reducers: {
    setSelectedChat(state, action) {
      state.selectedChat = action.payload;
    },
    setChats(state, action) {
      state.chats = action.payload;
    },
    setNotification(state, action) {
      state.notification = action.payload;
    },
    setOnlineUsers(state, action){
      state.onlineUsers = action.payload
    }
  },
});

export const { setSelectedChat, setChats, setNotification,setOnlineUsers } = chatSlice.actions;
export default chatSlice.reducer;
