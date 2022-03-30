import React from 'react';
// import '../../css/chat.css';

const Message = ({ message, receiverId, senderId }) => {
  // TODO ADD DATE and make the username Dynamic
  return (
    <div className="relative flex flex-col w-full h-fit pb-2">
      <div className={`flex w-full ${receiverId === message.receiverId ? 'justify-end' : ''}`}>
        <div className={`min-h-fit max-w-md p-3 rounded-t-xl ${receiverId === message.receiverId ? 'bg-sky-600 rounded-bl-xl' : 'bg-gray-300 rounded-br-xl'}`}>
          <p className={`text-md m-0 ${receiverId === message.receiverId ? 'text-white' : ''}`}>{message.message}</p>
        </div>
      </div>
      {/* <p className="absolute text-md m-0 top-3 right-5 p-2 -translate-y-2"></p> */}
    </div>
  );
};

export { Message };
