import React from "react";

const OwnerMessage = (props) => {
  return (
    <li class="flex justify-end">
      <div class="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
        <span class="block break-words">{props.text}</span>
      </div>
    </li>
  );
};

export default OwnerMessage;
