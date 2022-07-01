import axios from "axios";

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
  try {
    const data = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    socket.emit("join room", id);
    dispatch(addMessage(data));
  } catch (err) {
    console.log(err);
    dispatch(messageError(true));
  }
};

export const sendMessageApi = (msg, token, socket) => async (dispatch) => {
  const url = `http://localhost:5000/api/message`;
  try {
    const data = await axios.post(url, msg, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    socket.emit("new message", data);
    dispatch(sendMessage(data));
  } catch (err) {
    console.log(err.message);
  }
};
