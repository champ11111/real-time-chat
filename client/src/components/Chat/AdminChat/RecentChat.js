import React from "react";

const RecentChat = (props) => {
  return (
    <div
      className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out cursor-pointer hover:bg-gray-300 focus:outline-none"
      onClick={() => {
        const roomId = props._id;
        const chattingUserId = props.id;
        return props.onChatClick({ roomId, chattingUserId });
      }}
    >
      <img
        className="object-cover w-16 h-16 rounded-full"
        src={props.profilePic}
        alt="profile"
      />
      <div className="w-full pb-2">
        <span className="block ml-2 font-semibold text-base text-gray-600">
          {props.name}
        </span>
        <div className="flex">
          <p className="truncate w-28 ml-2 text-sm text-gray-600">
            {props.chat.text}
          </p>
          <span className="block ml-2 text-sm text-gray-600">
            {props.chat.time}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecentChat;
