import React from "react";

const OtherMessage = (props) => {
  return (
    <li className="flex justify-start">
      <img
        className="object-cover w-10 h-10 rounded-full"
        src={props.image}
        alt="profile"
      />
      <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow ml-3">
        {props.text.search(/data:image/) !== -1 ? (
          <img src={props.text} className="" alt="profile" />
        ) : (
          <span className="block break-words">{props.text}</span>
        )}
      </div>
    </li>
  );
};

export default OtherMessage;
