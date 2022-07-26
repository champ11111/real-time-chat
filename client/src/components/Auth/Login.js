import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router";

import { authRegister } from "../../actions/auth";

const Login = () => {
  const { user, loading, error } = useSelector((store) => store.user);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setLoginData((prevLoginData) => {
      return { ...prevLoginData, [name]: value };
    });
  };

  const submitHandler = () => {
    const url = "https://realtime-chat-express.herokuapp.com/api/auth/login";
    dispatch(authRegister(url, loginData));
  };

  if (user.role === "admin") {
    return <Navigate to={"/room"} />;
  }

  if (user.role === "user") {
    return <Navigate to={"/userroom"} />;
  }

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Login</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={inputChangeHandler}
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={inputChangeHandler}
          />
          <div className="flex justify-end">
            {/* <input className="mr-2 leading-tight" type="checkbox" />
            <span className="text-sm">Remember Me</span> */}
            <a href="../forgot-password/">Forgot Password?</a>
          </div>
          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-green text-white hover:bg-gray-700 bg-black focus:outline-none my-1"
            onClick={submitHandler}
          >
            Login
          </button>
        </div>
        <div className="text-grey-dark mt-6">
          Don't have an account yet?<span> </span>
          <a
            className="no-underline border-b border-blue-500 text-blue-500"
            href="../register/"
          >
            Sign up
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default Login;
