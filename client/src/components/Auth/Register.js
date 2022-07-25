import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router";

import { authRegister } from "../../actions/auth";

const ANONYMOUS_PICTURE =
  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

const Register = () => {
  const { user, loading, error } = useSelector((store) => store.user);
  const [registerData, setRegisterData] = useState({
    // profilePic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    profilePic: "",
    role: "user",
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const inputFileHandler = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setRegisterData((prevData) => {
        return { ...prevData, profilePic: event.target.result };
      });
    };
    reader.readAsDataURL(file);
  };
  console.log(registerData);
  const inputChangeHandle = (event) => {
    const { name, value } = event.target;
    setRegisterData((prevRegisterData) => {
      return { ...prevRegisterData, [name]: value };
    });
  };
  const submitHandler = () => {
    const url = "http://localhost:5000/api/auth/register";
    dispatch(authRegister(url, registerData));
  };

  if (user._id) {
    return <Navigate to={"/userroom"} />;
  }

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-4 text-4xl text-center">Sign up</h1>
          <div className="flex flex-col items-center mb-4">
            <div>
              <input
                onChange={inputFileHandler}
                type="file"
                name=""
                id="file"
                className="hidden"
              />
              <label htmlFor="file" id="uploadBtn">
                <img
                  id="photo"
                  src={
                    registerData.profilePic
                      ? registerData.profilePic
                      : ANONYMOUS_PICTURE
                  }
                  className="w-28 h-28 rounded-full"
                  alt="profile"
                />
              </label>
            </div>
            <p className="profile-text">Choose Profile</p>
          </div>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="name"
            placeholder="Full Name"
            onChange={inputChangeHandle}
            value={registerData.name}
          />

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            onChange={inputChangeHandle}
            value={registerData.email}
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            onChange={inputChangeHandle}
            value={registerData.password}
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirm_password"
            placeholder="Confirm Password"
            onChange={inputChangeHandle}
          />

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-green text-white hover:bg-gray-700 bg-black focus:outline-none my-1"
            onClick={submitHandler}
          >
            Create Account
          </button>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account? <span> </span>
          <a
            className="no-underline border-b border-blue-500 text-blue-500"
            href="../login/"
          >
            Log in
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default Register;
