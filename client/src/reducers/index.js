import counterReducer from "./counter";
import { authReducer } from "./auth";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  counter: counterReducer,
  user: authReducer,
});

export default allReducers;
