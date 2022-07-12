import React from "react";

const RecentChat = (props) => {
  return (
    <div
      class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out cursor-pointer hover:bg-gray-300 focus:outline-none"
      onClick={props.onChatClick}
      id={props.id}
    >
      <img
        class="object-cover w-16 h-16 rounded-full"
        src={props.profilePic}
        alt="profile"
        id={props.id}
      />
      <div class="w-full pb-2" id={props.id}>
        <span
          class="block ml-2 font-semibold text-base text-gray-600"
          id={props.id}
        >
          {props.name}
        </span>
        <div class="flex" id={props.id}>
          <p class="truncate w-28 ml-2 text-sm text-gray-600" id={props.id}>
            {props.chat.text}
          </p>
          <span class="block ml-2 text-sm text-gray-600" id={props.id}>
            {props.chat.time}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecentChat;
