import { Routes, Route, BrowserRouter } from "react-router-dom";

import Register from "./Auth/Register";
import Login from "./Auth/Login";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
