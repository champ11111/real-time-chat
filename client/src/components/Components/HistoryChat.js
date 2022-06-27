import React from 'react'

const HistoryChat = (props) => {
  return (
    <div class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out cursor-pointer hover:bg-gray-300 focus:outline-none">
      <img
        class="object-cover w-16 h-16 rounded-full"
        src={props.profilePicture}
        alt="username"
      />
      <div class="w-full pb-2">
          <span class="block ml-2 font-semibold text-base text-gray-600">
            {props.name}
          </span>
        <div class="flex">
          <p class= "truncate w-28 ml-2 text-sm text-gray-600 ">
          {props.chat.text}
          </p>
          <span class="block ml-2 text-sm text-gray-600">{props.chat.time} minutes</span>
        </div>
        
      </div>
    </div>
  )
}

export default HistoryChat