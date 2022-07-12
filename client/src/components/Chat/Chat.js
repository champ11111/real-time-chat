import React, { useEffect, createRef, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";

import OtherMessage from "./OtherMessage";
import OwnerMessage from "./OwnerMessage";
import InputField from "./InputField";

import { fetchCurrentMessages } from "../../actions/chat";

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
    <div class="hidden lg:col-span-3 lg:block pt-6">
      <div class="border-2 rounded-3xl rounded-b-none bg-white">
        <div>
          <div class="relative flex items-end p-3 pl-6 border-b border-gray-300 h-20">
            <img
              class="object-cover w-10 h-10 rounded-full"
              src={isGroupChat ? "" : profilePic}
              alt="username"
            />
            <span class="block ml-2 pb-2 font-bold text-gray-600">
              {isGroupChat ? roomName : name}
            </span>
          </div>

          <div class="relative w-full p-6 overflow-y-auto h-[40rem] ">
            <ul class="space-y-2">
              <h1 className="flex justify-center text-gray-400 text-opacity-80 font-light">
                Chat started
              </h1>
              {loading
                ? console.log("loading")
                : messages.map((message) => {
                    if (isSameSender(user, message))
                      return (
                        <OwnerMessage
                          text={message.content}
                          key={message._id}
                        />
                      );
                    return (
                      <OtherMessage
                        text={message.content}
                        image={message.sender.profilePic}
                        key={message._id}
                      />
                    );
                  })}
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
