import axios from "axios";
import { selectChat } from "../actions/chat";

export const RECENT_LOADING = "RECENT_LOADING";
export const RECENT_ERROR = "RECENT_ERROR";
export const ADD_RECENT_CHAT = "ADD_RECENT_CHAT";
export const NEW_CREATED_CHAT = "NEW_CREATED_CHAT";

export const recentLoading = (payload) => ({ type: RECENT_LOADING, payload });
export const recentError = (payload) => ({ type: RECENT_ERROR, payload });
export const recentChatResult = (payload) => ({
  type: ADD_RECENT_CHAT,
  payload,
});
export const newCreatedChat = (payload) => ({
  type: NEW_CREATED_CHAT,
  payload,
});

export const fetchRecentChat = (token) => async (dispatch) => {
  recentLoading(true);
  const url = "http://localhost:5000/api/room/";
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(recentChatResult(res.data));
  } catch (err) {
    dispatch(recentError(true));
    console.log(err.message);
  }
};

export const makeNewGroup = (groupData, token) => async (dispatch) => {
  recentLoading(true);
  const url = "http://localhost:5000/api/group/";
  try {
    const data = await axios.post(
      url,
      { groupData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(newCreatedChat(data));
  } catch (err) {
    dispatch(recentError(true));
    console.log(err.message);
  }
};

export const accessChat = (userId, token, recentChat) => async (dispatch) => {
  dispatch(recentLoading(true));
  const url = "http://localhost:5000/api/room/";
  try {
    const res = await axios.post(
      url,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = res.data;
    if (recentChat && !recentChat.find((e) => e._id === data._id)) {
      dispatch(newCreatedChat(data));
      dispatch(
        selectChat({
          isGroupChat: data.isGroupChat,
          index: 0,
          user: data.users.find((e) => e._id === userId),
          _id: data._id,
          roomName: data.roomName,
        })
      );
      return data._id;
    }
    dispatch(recentLoading(false));
    console.log("recentChat is", data);
    dispatch(
      selectChat({
        isGroupChat: data.isGroupChat,
        index: 0,
        user: data.users.find((el) => el._id === userId),
        _id: data._id,
        chatName: data.chatName,
      })
    );
    return data._id;
  } catch (err) {
    dispatch(recentError(true));
    console.log(err.message);
  }
};
