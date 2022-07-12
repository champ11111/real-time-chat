import counterReducer from "./counter";
import { authReducer } from "./auth";
import { combineReducers } from "redux";
import { chattingReducer } from "./chat";
import { recentChatReducer } from "./recentChat";

const allReducers = combineReducers({
  counter: counterReducer,
  user: authReducer,
  chatting: chattingReducer,
  recentChat: recentChatReducer,
});

export default allReducers;
