import React, { useEffect } from "react";

import InputField from "../AdminChat/InputField";
import Chat from "./Chat";

import { useSelector, useDispatch } from "react-redux";

import { accessChat } from "../../../actions/recentChat";

const UserRoom = () => {
  const { user, token } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(accessChat("62bd4a42275d4f3aa1cb565d", token, ""));
    console.log("user room");
  }, []);

  return (
    //chat at bottom of screen
    <div className="relative border-2 border-red-400 w-screen h-screen ">
      <img
        className="object-cover w-16 h-16 rounded-full m-2 mb-6 shadow absolute bottom-0 right-0"
        src={
          "https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
        }
        alt="profile"
      />
      <div className="flex flex-col absolute bottom-0 right-0 h-[30rem] w-[17rem] border-2 rounded-lg mr-20 mb-4 shadow-sm">
        <div className="w-full h-[3rem] border-b-2 shadow-sm flex items-center flex-row ">
          <img
            className="object-cover w-8 h-8 rounded-full m-2 shadow"
            src={
              "https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
            }
            alt="profile"
          />
          <h2 className="font-semibold">CHAMPCHAT</h2>
        </div>

        <div className=" h-[26rem] border-b-2 ">
          <Chat />
        </div>

        <div className="">
          <InputField />
        </div>
      </div>
    </div>
  );
};

export default UserRoom;
