import React from 'react';
// import '../../css/chat.css';

const Message = ({ name, message, imageUrl }) => {
  return (
    <div className="relative flex flex-row w-full h-fit p-[16px]">
      <img className="w-12 h-12 rounded-full cursor-pointer mt-7" src="https://ui-avatars.com/api/?name=Me" alt="/" />
      <div className="flex flex-col justify-between pl-2 pt-5">
        <p className="text-md m-0">{message}</p>
      </div>
      <p className="absolute text-md m-0 top-3 right-5 p-2 -translate-y-2">3/27/22</p>
    </div>
  );
};

export { Message };
