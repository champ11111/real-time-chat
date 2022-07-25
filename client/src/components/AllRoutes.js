import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./Home";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Logout from "./Auth/Logout";
import AdminRoom from "./Chat/AdminChat/AdminRoom";
import UserRoom from "./Chat/UserChat/UserRoom";
import TestChatService from "./Auth/TestChatService";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/testchat" element={<TestChatService />} />
        <Route path="/room" element={<AdminRoom />} />
        <Route path="/userroom" element={<UserRoom />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
