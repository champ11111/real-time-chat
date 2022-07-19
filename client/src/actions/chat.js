import axios from "axios";

import { accessChat } from "./recentChat";

export const SELECT_CHAT = "SELECT_CHAT";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const MESSAGE_LOADING = "MESSAGE_LOADING";
export const MESSAGE_ERROR = "MESSAGE_ERROR";
export const SEND_MESSAGE = "SEND_MESSAGE";

export const selectChat = (payload) => ({ type: SELECT_CHAT, payload });
export const addMessage = (payload) => ({ type: ADD_MESSAGE, payload });
export const messageLoading = (payload) => ({ type: MESSAGE_LOADING, payload });
export const messageError = (payload) => ({ type: MESSAGE_ERROR, payload });
export const sendMessage = (payload) => ({ type: SEND_MESSAGE, payload });

export const fetchCurrentMessages = (id, token, socket) => async (dispatch) => {
  dispatch(messageLoading(true));
  const url = `http://localhost:5000/api/message/${id}`;
  console.log("hello");
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    socket.emit("join room", id);
    console.log(res.data);
    dispatch(addMessage(res.data));
  } catch (err) {
    console.log(err);
    dispatch(messageError(true));
  }
};

export const sendMessageApi =
  (content, roomId, token, socket) => async (dispatch) => {
    const url = `http://localhost:5000/api/message`;
    try {
      const res = await axios.post(
        url,
        { content, roomId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
      console.log(data);
      socket.emit("new message", data);
      dispatch(sendMessage(data));
    } catch (err) {
      console.log(err.message);
    }
  };
