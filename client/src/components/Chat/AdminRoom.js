import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router";

import Chat from "./Chat";
import SideNavbar from "./SideNavbar";

import { selectChat } from "../../actions/chat";
import { accessChat } from "../../actions/recentChat";

const AdminRoom = () => {
  const { user, token, loading, error } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const { chatting } = useSelector((store) => store.chatting);
  const { recentChat } = useSelector((store) => store.recentChat);

  const clickChatHandler = (event) => {
    dispatch(accessChat(event.target.id, token, recentChat));
  };

  if (!user._id) {
    return <Navigate to="/register" />;
  }

  return (
    <div class="flex-col container max-w-screen h-screen bg-gray-100">
      <div class=" border rounded grid grid-cols-4">
        <SideNavbar onChatClick={clickChatHandler} />
        {chatting._id ? <Chat /> : <MessageStarter {...user} />}
      </div>
    </div>
  );
};

export default AdminRoom;

const MessageStarter = ({ profilePic, name }) => {
  return (
    <div class="hidden lg:col-span-3 lg:block pt-6">
      <div class="border-2 rounded-3xl rounded-b-none bg-white h-full flex flex-col items-center justify-center">
        <img
          class="object-cover w-24 h-24 rounded-full"
          src={profilePic}
          alt="username"
        />
        <h3 className="font-bold m-4">Welcome, {name}</h3>
        <p>Please select a chat to start messaging.</p>
      </div>
    </div>
  );
};
