import React from 'react';

export default function AvailableUser({ handleClick, connectionId, username, lastMessage }) {
  return (
    <div onClick={() => handleClick(connectionId)} className="relative flex flex-row w-full h-[94px] p-[16px] hover:bg-gray-100 transition duration-150 cursor-pointer">
      <img className="w-14 h-14 rounded-full" src="https://ui-avatars.com/api/?name=Me" alt="/" />
      <div className="flex flex-col justify-evenly pl-2 overflow-hidden whitespace-nowrap">
        <p className="text-lg font-bold m-0">@{username}</p>
        <p className="text-md m-0 text-gray-500 w-50 h-6 truncate">Message in a bottle message in a bottle message</p>
      </div>
      <p className="absolute text-md m-0 top-0 right-0 p-2">3/27/22</p>
    </div>
  );
}
