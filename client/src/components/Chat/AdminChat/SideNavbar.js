import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Spinner from "react-spinner-material";

import RecentChat from "./RecentChat";

import { fetchRecentChat } from "../../../actions/recentChat";

const SideNavbar = (props) => {
  const { user, token } = useSelector((state) => state.user);
  const { recentChat, loading } = useSelector((state) => state.recentChat);
  const [searchInput, setSearchInput] = React.useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecentChat(token));
  }, []);

  return (
    <div className="max-h-screen col-span-1">
      <div className="flex items-center">
        <img
          className="object-cover w-[4.5rem] h-[4.5rem] rounded-full m-5 mb-1 mr-3 shadow"
          src={
            user.profilePic
              ? user.profilePic
              : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          }
          alt="profile"
        />
        <p className="text-3xl font-bold pt-3">CHATSERVICE</p>
      </div>
      <div className="mx-3 mb-3 mt-2 flex justify-between items-center">
        <div className="relative text-gray-600 w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-6 h-6 text-gray-300"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </span>
          <input
            type="search"
            className="block w-full py-2 pl-10 pr-3 bg-white rounded-full outline-none"
            name="search"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-scroll h-[40rem]">
        {loading ? (
          <div className="flex flex-col items-center mt-4">
            <Spinner />
          </div>
        ) : (
          recentChat.map((chat) => {
            const text = chat.latestMessage ? chat.latestMessage.content : "";
            const date = chat.latestMessage
              ? moment(chat.latestMessage.createdAt).fromNow()
              : "";
            const chattingUser = chat.users.find((e) => e._id !== user._id);
            if (
              searchInput &&
              !chattingUser.name
                .toLowerCase()
                .includes(searchInput.toLowerCase(0))
            )
              return;
            if (!chattingUser) return;
            return (
              <RecentChat
                key={chattingUser._id}
                id={chattingUser._id}
                onChatClick={props.onChatClick}
                {...chat}
                chat={{
                  text: text,
                  time: date,
                }}
                name={chattingUser.name}
                profilePic={
                  chattingUser.profilePic
                    ? chattingUser.profilePic
                    : "https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
                }
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default SideNavbar;
