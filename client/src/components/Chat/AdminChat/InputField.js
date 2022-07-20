import React, { useState, useRef } from "react";
import InputEmoji from "react-input-emoji";

import { useDispatch } from "react-redux";

import { fetchRecentChat } from "../../../actions/recentChat";
import { sendMessageApi } from "../../../actions/chat";

const InputField = ({ roomId, socket, token }) => {
  const dispatch = useDispatch();

  const [messageInput, setMessageInput] = useState("");

  const inputSubmitHandler = (event) => {
    dispatch(sendMessageApi(messageInput, roomId, token, socket));
    dispatch(fetchRecentChat(token));
    setMessageInput("");
  };

  const inputFileRef = useRef(null);

  const inputFileHandler = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setMessageInput(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const onBtnFileClick = () => {
    /*Collecting node-element and performing click*/
    inputFileRef.current.click();
  };

  return (
    <div className="flex items-center justify-between w-full p-1 border-t border-gray-300">
      <input
        type="file"
        className="hidden"
        ref={inputFileRef}
        onChange={inputFileHandler}
      ></input>

      <button onClick={onBtnFileClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
          />
        </svg>
      </button>

      <InputEmoji
        value={messageInput}
        onChange={setMessageInput}
        cleanOnEnter
        onEnter={inputSubmitHandler}
        required
        placeholder="Type a message"
      />
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
      </button>
      <button type="submit" onClick={inputSubmitHandler}>
        <svg
          className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      </button>
    </div>
  );
};

export default InputField;
