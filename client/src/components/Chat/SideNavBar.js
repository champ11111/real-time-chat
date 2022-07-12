import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import RecentChat from "./RecentChat";

import { fetchRecentChat } from "../../actions/recentChat";

const SideNavbar = (props) => {
  const { user, token } = useSelector((state) => state.user);
  const { recentChat, loading } = useSelector((state) => state.recentChat);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecentChat(token));
  }, []);

  return (
    <div class="max-h-screen col-span-1">
      <div class="flex items-center">
        <img
          class="object-cover w-20 h-20 rounded-full m-5 mb-1 mr-3 shadow"
          src={
            user.profilePic
              ? user.profilePic
              : "https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
          }
          alt="profile"
        />
        <p class="text-3xl font-bold pt-3">CHAMPCHAT</p>
      </div>
      <div class="mx-3 mb-3 mt-2 flex justify-between items-center">
        <div class="relative text-gray-600 w-full">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              class="w-6 h-6 text-gray-300"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </span>
          <input
            type="search"
            class="block w-full py-2 pl-10 bg-white rounded-full outline-none"
            name="search"
            placeholder="Search"
            required
          />
        </div>
        {/* <p class ="ml-2 text-yellow-500 font-bold text-sm">manage</p> */}
      </div>

      <div class="overflow-scroll h-[40rem]">
        {loading
          ? console.log("loading")
          : recentChat.map((chat) => {
              const text = chat.latestMessage.content;
              const date = moment(chat.latestMessage.createdAt).fromNow();
              const chattingUser = chat.users.find((e) => e._id !== user._id);

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
            })}
      </div>
    </div>
  );
};

export default SideNavbar;
