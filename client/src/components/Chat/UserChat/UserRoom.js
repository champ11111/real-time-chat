import React, { useEffect } from "react";
import { Navigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { CgArrowsExpandLeft } from "react-icons/cg";
import { FaRegWindowMinimize } from "react-icons/fa";
import { TbArrowsDiagonalMinimize } from "react-icons/tb";

import Chat from "./Chat";

import { accessChat } from "../../../actions/recentChat";

const UserRoom = () => {
  const [isShowChat, setIsShowChat] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);

  const { user, token } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const buttonClickHandler = () => {
    setIsShowChat(!isShowChat);
  };

  useEffect(() => {
    dispatch(accessChat("62bd4a42275d4f3aa1cb565d", token, ""));
  }, []);

  const minimizeClickHandler = () => {
    setIsShowChat(false);
    setIsExpanded(false);
  };

  const expandClickHandler = () => {
    setIsExpanded(!isExpanded);
  };

  if (!user._id) {
    return <Navigate to="/login" />;
  }

  return (
    //chat at bottom of screen
    <div className="w-screen h-screen">
      <img
        onClick={buttonClickHandler}
        className="object-cover w-14 h-14 rounded-full m-4 ml-1 mb-6 shadow fixed bottom-0 right-0"
        src={
          "https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
        }
        alt="profile"
      />
      <div
        className={`flex flex-col fixed ${
          isExpanded
            ? "ml-[310px] bottom-0 h-[40rem] w-[50rem] "
            : "bottom-0 right-0 h-[30rem] w-[17rem] "
        }border-[1px]  mr-20 mb-4 shadow-sm rounded-2xl ${
          isShowChat ? "" : "hidden"
        }`}
      >
        <div
          className={`w-full ${
            isExpanded ? "h-[4rem] " : "h-[3rem] "
          }border-b-2 shadow-sm flex justify-between`}
        >
          <div className="flex items-center">
            <img
              className="object-cover w-8 h-8 rounded-full m-2 shadow"
              src={
                "https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
              }
              alt="profile"
            />
            <h2 className="font-semibold">CHATSERVICE</h2>
          </div>

          <div className="flex items-center">
            {isExpanded ? (
              <TbArrowsDiagonalMinimize
                className="w-6 h-[1.3rem] mr-0"
                onClick={expandClickHandler}
              ></TbArrowsDiagonalMinimize>
            ) : (
              <CgArrowsExpandLeft
                className="w-6 mr-0"
                onClick={expandClickHandler}
              ></CgArrowsExpandLeft>
            )}

            <FaRegWindowMinimize
              className="w-6 h-3 m-2 mt-0 ml-0"
              onClick={minimizeClickHandler}
            ></FaRegWindowMinimize>
          </div>
        </div>

        <div className="">
          <Chat isExpanded={isExpanded} />
        </div>
      </div>
    </div>
  );
};

export default UserRoom;
