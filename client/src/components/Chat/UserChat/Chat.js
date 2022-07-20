import io from "socket.io-client";
import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-spinner-material";

import OtherMessage from "./OtherMessage";
import OwnerMessage from "./OwnerMessage";

import InputField from "./InputField";
import { fetchCurrentMessages } from "../../../actions/chat";

const SERVER_URL = "http://localhost:5000";
let socket;

const isSameSender = (user, message) => {
  return user._id === message.sender._id;
};

const Chat = ({ isExpanded }) => {
  const { user, token } = useSelector((state) => state.user);
  const { chatting, messages, loading } = useSelector(
    (state) => state.chatting
  );

  const dispatch = useDispatch();

  const bottomRef = useRef(null);

  useEffect(() => {
    socket = io(SERVER_URL);
    socket.emit("setup", user);
    socket.on("connected", () => {
      console.log("user connected");
    });
  }, []);

  useEffect(() => {
    if (!chatting._id) return;
    dispatch(fetchCurrentMessages(chatting._id, token, socket));

    socket.on("message received", (receivedMessage) => {
      dispatch(fetchCurrentMessages(chatting._id, token, socket));
    });
  }, [chatting]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatting]);

  return (
    <>
      <div
        className={`w-full p-1 pr-3 overflow-y-auto ${
          isExpanded ? "h-[32rem]" : "h-[23rem]"
        } `}
      >
        <ul className="space-y-2">
          <h2 className="flex justify-center text-gray-400 text-opacity-80 font-light">
            Chat started
          </h2>
          {loading ? (
            <div className="flex flex-col items-center mt-4">
              <Spinner />
            </div>
          ) : (
            messages.map((message) => {
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
            })
          )}
          <div ref={bottomRef} />
        </ul>
      </div>
      <InputField roomId={chatting._id} socket={socket} token={token} />
    </>
  );
};

export default Chat;
