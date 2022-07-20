import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import Spinner from "react-spinner-material";

import OtherMessage from "./OtherMessage";
import OwnerMessage from "./OwnerMessage";
import InputField from "./InputField";

import { fetchCurrentMessages } from "../../../actions/chat";

const SERVER_URL = "http://localhost:5000";
let socket, currentChattingUser;

const isSameSender = (user, message) => {
  return user._id === message.sender._id;
};

const Chat = () => {
  const { user, token } = useSelector((state) => state.user);
  const { messages, loading } = useSelector((state) => state.chatting);
  const {
    chatting: {
      isGroupChat,
      roomName,
      user: { profilePic, name },
      _id,
    },
  } = useSelector((store) => store.chatting);

  const dispatch = useDispatch();

  const bottomRef = useRef(null);

  useEffect(() => {
    socket = io(SERVER_URL);
    socket.emit("setup", user);
    socket.on("connected", () => {
      console.log("user connected");
    });
    socket.on("message received", (receivedMessage) => {
      dispatch(fetchCurrentMessages(_id, token, socket));
    });
  }, []);

  useEffect(() => {
    if (!_id) return;
    dispatch(fetchCurrentMessages(_id, token, socket));

    currentChattingUser = _id;
  }, [_id]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="hidden lg:col-span-3 lg:block pt-6">
      <div className="border-2 rounded-3xl rounded-b-none bg-white">
        <div>
          <div className="relative flex items-end p-3 pl-6 border-b border-gray-300 h-20">
            <img
              className="object-cover w-10 h-10 rounded-full"
              src={isGroupChat ? "" : profilePic}
              alt="profile"
            />
            <span className="block ml-2 pb-2 font-bold text-gray-600">
              {isGroupChat ? roomName : name}
            </span>
          </div>

          <div className="relative w-full p-6 overflow-y-auto h-[40rem] ">
            <ul className="space-y-2">
              <h1 className="flex justify-center text-gray-400 text-opacity-80 font-light">
                Chat started
              </h1>
              {loading ? (
                <div className="flex flex-col items-center mt-4">
                  <Spinner />
                </div>
              ) : (
                messages.map((message, index) => {
                  if (isSameSender(user, message))
                    return <OwnerMessage text={message.content} key={index} />;
                  return (
                    <OtherMessage
                      text={message.content}
                      image={message.sender.profilePic}
                      key={index}
                    />
                  );
                })
              )}
              <div ref={bottomRef} />
            </ul>
          </div>
          <InputField roomId={_id} socket={socket} token={token} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
