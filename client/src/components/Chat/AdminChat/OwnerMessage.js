import React from "react";

const OwnerMessage = (props) => {
  return (
    <li className="flex justify-end">
      <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
        {props.text.search(/data:image/) !== -1 ? (
          <img src={props.text} className="" alt="profile" />
        ) : (
          <span className="block break-words">{props.text}</span>
        )}
      </div>
    </li>
  );
};

export default OwnerMessage;
