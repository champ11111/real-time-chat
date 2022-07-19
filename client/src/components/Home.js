import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const Home = () => {
  const { user } = useSelector((store) => store.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role === "user") {
    return <Navigate to="/userroom" />;
  }

  if (user.role === "admin") {
    return <Navigate to="/room" />;
  }

  return <div>Home</div>;
};

export default Home;
