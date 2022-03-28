import { Button, Input, TextInput } from '@mantine/core';
//import { Message, MessagePreview } from 'components/chat/Message';
import { RequireAuth } from 'hooks/useAuth';
import { useEffect, useRef, useState, React } from 'react';
import axios from 'axios';
import endPoints from 'services/api';
import '../css/chat.css';
import contacts from '../contacts.js';

var chatPointer = 0;
const Message = ({ name, message, imageUrl }) => {
  if (name === 'Me') imageUrl = `https://ui-avatars.com/api/?name=Me`;
  return (
    <div className="chat-message pointer-hover">
      <img className="profile-image" src={imageUrl} alt="/" />
      <span>
        <p className="message-name">{name}</p>
        <p className="message-content">{message}</p>
      </span>
    </div>
  );
};
const MessagePreview = ({ id, name, message, imageUrl }) => {
  function changeChat(index) {
    chatPointer = index;
  }
  return (
    <div className="contact-item pointer pointer-hover" onClick={() => changeChat(id)}>
      <img className="profile-image" src={imageUrl} alt="/" />
      <span>
        <p>{name}</p>
        <p className="text-preview">{message}</p>
      </span>
    </div>
  );
};

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [chats, setChats] = useState();

  const fetchConversations = async () => {
    try {
      const { data } = await axios.get(endPoints.base + '/messages');
      console.log(data);
      setChats(data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchConversations();
  }, []);

  const textRef = useRef(null);
  const [chat, setChat] = useState(null);
  const initialChat = contacts[0].messages;
  contacts.forEach((message) => (message.imageUrl = `https://ui-avatars.com/api/?name=${message.name}`));
  initialChat.forEach((message) => (message.imageUrl = `https://ui-avatars.com/api/?name=${message.name}`));
  const initialChat2 = contacts[1].messages;
  initialChat2.forEach((message) => (message.imageUrl = `https://ui-avatars.com/api/?name=${message.name}`));
  const initialChat3 = contacts[2].messages;
  initialChat3.forEach((message) => (message.imageUrl = `https://ui-avatars.com/api/?name=${message.name}`));
  let i = 0;

  function changeChat() {
    const chats = contacts[chatPointer].messages;
    chats.forEach((message) => (message.imageUrl = `https://ui-avatars.com/api/?name=${message.name}`));
    setChat(contacts[chatPointer].messages);
  }

  function sendChat() {
    const message = {
      name: 'Me',
      message: textRef.current.value,
    };
    contacts[chatPointer].messages.push();
    const chats = contacts[chatPointer].messages;
    chats.forEach((message) => (message.imageUrl = `https://ui-avatars.com/api/?name=${message.name}`));
    textRef.current.value = '';
    setChat((o) => [...o, message]);
    console.log(chat);
  }

  return (
    <div className="grid place-items-center mx-11 my-11">
      <div className="flex flex-row border-solid border-2 border-gray-200 rounded-lg w-full max-w-[1192px] h-[75vh] shadow-lg">
        {/* Inbox section */}
        <div className="flex flex-col border-solid border-0 border-r-2 border-gray-200 rounded-tl-lg rounded-bl-lg w-[368px] h-full">
          <div className="relative flex items-center border-solid border-0 border-b-2 border-gray-200 justify-between rounded-tl-lg w-full max-h-[94px]">
            <p className="text-lg font-bold m-auto pl-14 justify-self-center">Inbox</p>
            {/* This p tag will be a button that will allow the user to sort by read/unread */}
            <p className="text-lg font-bold w-14 pr-5 cursor-pointer">...</p>
            <div className="absolute bg-white border-solid border-2 border-gray-200 w-24 h-fit right-0 top-0 translate-y-12 translate-x-6 z-10 shadow-lg rounded-md">
              <p className="text-md underline m-auto pl-2 my-2 cursor-pointer">Inbox</p>
              <p className="text-md underline m-auto pl-2 my-2 cursor-pointer">Unread</p>
              <p className="text-md underline m-auto pl-2 my-2 cursor-pointer">Archived</p>
            </div>
          </div>
          <div className="overflow-hidden overflow-y-auto h-full">
            {/* Inbox item components will be rendered here */}
            <div className="relative flex flex-row w-full h-[94px] p-[16px] hover:bg-gray-100 transition duration-150 cursor-pointer">
              <img className="w-14 h-14 rounded-full" src="https://ui-avatars.com/api/?name=Me" alt="/" />
              <div className="flex flex-col justify-evenly pl-2 overflow-hidden whitespace-nowrap">
                <p className="text-lg font-bold m-0">@Username</p>
                <p className="text-md m-0 text-gray-500 w-50 h-6 truncate">Message in a bottle message in a bottle message</p>
              </div>
              <p className="absolute text-md m-0 top-0 right-0 p-2">3/27/22</p>
            </div>
          </div>
        </div>
        {/* Message section */}
        <div className="flex flex-col rounded-tr-lg rounded-br-lg w-full h-full">
          <div className="relative flex items-center border-solid border-0 border-b-2 border-gray-200 justify-between rounded-tr-lg w-full max-h-[94px]">
            <p className="text-lg font-bold m-auto pl-14 justify-self-center">@Username</p>
            {/* This p tag will be a button that will allow the user to sort by read/unread */}
            <p className="text-lg font-bold w-14 pr-5 cursor-pointer">...</p>
            <div className="absolute bg-white border-solid border-2 border-gray-200 w-24 h-fit right-0 top-0 translate-y-12 translate-x-6 z-10 shadow-lg rounded-md">
              <p className="text-md underline m-auto pl-2 my-2 cursor-pointer">Archive</p>
              <p className="text-md underline m-auto pl-2 my-2 cursor-pointer">Report</p>
            </div>
          </div>
          <div className="overflow-hidden overflow-y-auto h-full">
            {/* Message item components will be rendered here */}
            <div className="relative flex flex-row w-full h-fit p-[16px]">
              <img className="w-12 h-12 rounded-full cursor-pointer" src="https://ui-avatars.com/api/?name=Me" alt="/" />
              <div className="flex flex-col justify-between pl-2">
                <p className="text-md m-0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti blanditiis reiciendis atque ducimus voluptate, molestiae ex aspernatur. Ad provident blanditiis ducimus quo
                  necessitatibus, ut saepe similique, repudiandae, sed voluptate soluta ipsa? Ex quas totam possimus error dolores, non eveniet veritatis!
                </p>
              </div>
              <p className="absolute text-md m-0 top-0 right-0 p-2 -translate-y-2">3/27/22</p>
            </div>
          </div>
          {/* Form section, message form, submit message button */}
          <div className="w-full border-solid border-0 border-t-2 border-gray-200 rounded-br-lg h-[100px]">
            <div className="flex flex-row justify-between items-center h-full p-5 gap-4">
              <input className="border-0 outline-0 w-full h-full rounded-lg shadow-lg p-2" type="text" ref={textRef} />
              <button className="border-0 outline-0 bg-sky-600 rounded-lg hover:bg-sky-500 transition duration-300 cursor-pointer" onClick={sendChat}>
                <p className="text-lg p-2 m-0 text-white">Send</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="body-container vertical-spacing">
    //   <div className="inbox-container">
    //     <div id="toggle-menu-contact" className="contact-box noselect" onClick= {() => changeChat()}>
    //       {contacts && contacts.map((item) => <MessagePreview key={item.name} id={item.id} name={item.name} message={item.messages[4].message} imageUrl={item.imageUrl} />)}
    //     </div>
    //     <div id="toggle-menu-chat" className="chat-box">
    //       <div className="chat-header">
    //         <button id="menu-contact" className="icon-previous">
    //           <img src="img/svg/angle-double-left.svg" alt="" />
    //         </button>
    //         <span className="chat-header-text">
    //           <p className="title-name">{contacts[chatPointer].name}</p>
    //         </span>
    //       </div>
    //       <div id="chat-container" className="chat-container">
    //         {chat && chat.map((item) => <Message key={item.name + `${i++}`} name={item.name} message={item.message} imageUrl={contacts[chatPointer].imageUrl} />)}
    //       </div>
    //       <div className="chat-terminal">
    //         <form>
    //           <TextInput ref = {textRef}placeholder="Enter Message" sx={{ width: '100%' }}></TextInput>
    //           <Button onClick={() => sendChat()}>Send</Button>
    //         </form>
    //       </div>
    //     </div>
    //     <div className="about-box">
    //       <div className="about-header">
    //         <p className="about-header-text">About</p>
    //       </div>
    //       <div className="about-profile">
    //         <img className="profile-image" src="img/jpg/profile1.jpg" alt="" />
    //         <p className="message-name">Melissa Parks</p>
    //         <p className="message-content">
    //           I am a preceptor at Allegheny General Hospital in Pittsburgh, Pennsylvania. I have been a preceptor for over 10 years and have experience precepting students and residents in Psychiatric
    //           Mental Health.
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
