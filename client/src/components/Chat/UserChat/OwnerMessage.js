import React from "react";

const OwnerMessage = (props) => {
  return (
    <li className="flex justify-end">
      <div className="relative max-w-[160px] px-2 py-2 text-gray-700 rounded shadow">
        {props.text.search(/data:image/) !== -1 ? (
          <img src={props.text} className="" alt="profile" />
        ) : (
          <span className="block break-words text-sm">{props.text}</span>
        )}
      </div>
    </li>
  );
};

export default OwnerMessage;
