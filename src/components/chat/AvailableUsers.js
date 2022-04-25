import React from 'react';
// TODO: add date and last message
export default function AvailableUser({ id, handleClick, connectionId, username, lastMessage }) {
  return (
    <div onClick={() => handleClick({ connectionId, username, id })} className="relative flex flex-row w-full h-[94px] p-[16px] hover:bg-gray-100 transition duration-150 cursor-pointer">
      <img className="w-14 h-14 rounded-full" src={`https://ui-avatars.com/api/?name=${username}`} alt="/" />
      <div className="flex flex-col justify-evenly pl-2 overflow-hidden whitespace-nowrap">
        <p className="text-lg font-bold m-0">@{username}</p>
        <p className="text-md m-0 text-gray-500 w-50 h-6 truncate"></p>
      </div>
      <p className="absolute text-md m-0 top-0 right-0 p-2"></p>
    </div>
  );
}
