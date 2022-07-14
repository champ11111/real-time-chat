import io from "socket.io-client";
import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import OtherMessage from "./OtherMessage";
import OwnerMessage from "./OwnerMessage";

import { fetchCurrentMessages } from "../../../actions/chat";

const SERVER_URL = "http://localhost:5000";
let socket;

const isSameSender = (user, message) => {
  return user._id === message.sender._id;
};

const Chat = () => {
  const { user, token } = useSelector((state) => state.user);
  const { messages, loading } = useSelector((state) => state.chatting);
  const { chatting } = useSelector((store) => store.chatting);

  const dispatch = useDispatch();

  const bottomRef = useRef(null);

  useEffect(() => {
    socket = io(SERVER_URL);
    socket.emit("setup", user);
    socket.on("connected", () => {
      console.log("user connected");
    });
    socket.on("message received", (receivedMessage) => {
      dispatch(fetchCurrentMessages("62cbbc5aedf83736d593eda4", token, socket));
    });
  }, []);

  useEffect(() => {
    dispatch(fetchCurrentMessages("62cbbc5aedf83736d593eda4", token, socket));
  }, []);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className=" w-full p-1 overflow-y-auto h-[23rem]">
      <ul className="space-y-2">
        <h2 className="flex justify-center text-gray-400 text-opacity-80 font-light">
          Chat started
        </h2>
        {loading
          ? console.log("loading")
          : messages.map((message) => {
              if (isSameSender(user, message))
                return (
                  <OwnerMessage text={message.content} key={message._id} />
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
  );
};

export default Chat;
