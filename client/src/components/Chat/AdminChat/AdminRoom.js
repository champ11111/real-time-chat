import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router";

import Chat from "./Chat";
import SideNavbar from "./SideNavbar";

import { accessChat } from "../../../actions/recentChat";

const AdminRoom = () => {
  const { user, token, loading, error } = useSelector((store) => store.user);
  const { chatting } = useSelector((store) => store.chatting);
  const { recentChat } = useSelector((store) => store.recentChat);

  const dispatch = useDispatch();

  const clickChatHandler = ({ roomId, chattingUserId }) => {
    if (chatting._id === roomId) {
      return;
    }
    dispatch(accessChat(chattingUserId, token, recentChat));
  };

  if (!user._id) {
    return <Navigate to="/register" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/userroom" />;
  }

  return (
    <div className="flex-col container max-w-screen h-screen bg-gray-100">
      <div className=" border rounded grid grid-cols-4">
        <SideNavbar onChatClick={clickChatHandler} />
        {chatting._id ? <Chat /> : <MessageStarter {...user} />}
      </div>
    </div>
  );
};

export default AdminRoom;

const MessageStarter = ({ profilePic, name }) => {
  return (
    <div className="hidden lg:col-span-3 lg:block pt-6">
      <div className="border-2 rounded-3xl rounded-b-none bg-white h-full flex flex-col items-center justify-center">
        <img
          className="object-cover w-24 h-24 rounded-full"
          src={profilePic}
          alt="username"
        />
        <h3 className="font-bold m-4">Welcome, {name}</h3>
        <p>Please select a chat to start messaging.</p>
      </div>
    </div>
  );
};
