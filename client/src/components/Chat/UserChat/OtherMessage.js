import React from "react";

const OtherMessage = (props) => {
  return (
    <div>
      <li className="flex justify-start">
        <img
          className="object-cover w-8 h-8 rounded-full"
          src={props.image}
          alt="profile"
        />
        <div className="relative max-w-[160px] px-2 py-2 text-gray-700 bg-gray-100 rounded shadow ml-3">
          {props.text.search(/data:image/) !== -1 ? (
            <img src={props.text} className="" alt="profile" />
          ) : (
            <span className="block break-words text-sm">{props.text}</span>
          )}
        </div>
      </li>
    </div>
  );
};

export default OtherMessage;
