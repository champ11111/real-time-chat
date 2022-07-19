import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./Home";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import ForgotPassword from "./Auth/ForgotPassword";
import AdminRoom from "./Chat/AdminChat/AdminRoom";
import UserRoom from "./Chat/UserChat/UserRoom";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/room" element={<AdminRoom />} />
        <Route path="/userroom" element={<UserRoom />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
