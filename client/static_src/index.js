import React from "react";
import ReactDOM from "react-dom/client";
import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
} from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import allReducers from "../src/reducers";
import UserRoom from "../src/components/Chat/UserChat/UserRoom";
import AdminRoom from "../src/components/Chat/AdminChat/AdminRoom";
import Register from "../src/components/Auth/Register";
import Login from "../src/components/Auth/Login";
import Logout from "../src/components/Auth/Logout";

const store = createStore(
  allReducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Logout />
  </Provider>
  // </React.StrictMode>
);
