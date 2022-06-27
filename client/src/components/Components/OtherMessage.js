import React from "react";

const OtherMessage = (props) => {
  return (
    <li class="flex justify-start">
      <img
        class="object-cover w-10 h-10 rounded-full"
        src={props.image}
        alt="profile"
      />
      <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow ml-3">
        <span class="block">{props.text}</span>
      </div>
    </li>
  );
};

export default OtherMessage;
