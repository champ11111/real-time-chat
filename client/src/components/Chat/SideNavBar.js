import React from "react";

import HistoryChat from "./HistoryChat";

const SideNavbar = () => {
  return (
    <div class="max-h-screen col-span-1">
      <div class="flex items-center">
        <img
          class="object-cover w-20 h-20 rounded-full m-5 mb-1 mr-3 shadow"
          src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
          alt="username"
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
        <HistoryChat
          chat={{ text: "bye see you later", time: 25 }}
          name={"John Don"}
          profilePicture={
            "https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
          }
        />
        <HistoryChat
          chat={{ text: "good morning my name is", time: 50 }}
          name={"emma"}
          profilePicture={
            "https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
          }
        />
        <HistoryChat
          chat={{ text: "good morning", time: 50 }}
          name={"emma"}
          profilePicture={
            "https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
          }
        />
        <HistoryChat
          chat={{ text: "good morning", time: 50 }}
          name={"emma"}
          profilePicture={
            "https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
          }
        />
        <HistoryChat
          chat={{ text: "bye", time: 25 }}
          name={"John Don"}
          profilePicture={
            "https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
          }
        />
      </div>
    </div>
  );
};

export default SideNavbar;
