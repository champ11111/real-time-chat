import React from "react";
import OtherMessage from "./OtherMessage";
import OwnerMessage from "./OwnerMessage";
import InputField from "./InputField";

const Chat = (props) => {
  return (
      <div>
        <div class="relative flex items-end p-3 pl-6 border-b border-gray-300 h-20">
          <img
            class="object-cover w-10 h-10 rounded-full"
            src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
            alt="username"
          />
          <span class="block ml-2 pb-2 font-bold text-gray-600">{props.userName}</span>
        </div>

        <div class="relative w-full p-6 overflow-y-auto h-[40rem]">
          <ul class="space-y-2">
            <OtherMessage
              text={"hi"}
              image={props.profilePicture}
            />
            <OwnerMessage text={"hii"} />
          </ul>
        </div>
        <InputField />
    </div>
)
};

export default Chat;
