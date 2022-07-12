import { Routes, Route, BrowserRouter } from "react-router-dom";

import Register from "./Auth/Register";
import Login from "./Auth/Login";
import ForgotPassword from "./Auth/ForgotPassword";
import AdminRoom from "./Chat/AdminRoom";
import UserRoom from "./Chat/UserRoom";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
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
