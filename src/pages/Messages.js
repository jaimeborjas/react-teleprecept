import { Button, Input, TextInput } from '@mantine/core';
//import { Message, MessagePreview } from 'components/chat/Message';
import { useRef, useState, React } from 'react';
import '../css/chat.css';
import contacts from '../contacts.js';

var chatPointer = 0;
const Message = ({name, message, imageUrl}) => {
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
  
  function changeChat(index)
  {
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
  //const messagePreviewComponents = messagePreview.map((item) => <MessagePreview key={item.name} name={item.name} message={item.message} imageUrl={item.imageUrl} />);
  //const messageComponents = messages.map((item) => <Message key={item.name + `${i++}`} name={item.name} message={item.message} imageUrl={item.imageUrl} />)
  function changeChat()
  {
    console.log(chatPointer);
    initialChat.forEach((message) => (message.imageUrl = `https://ui-avatars.com/api/?name=${message.name}`));
    setChat(contacts[chatPointer].messages);
    
  }
  
  function sendChat()
  {
    setChat(chat + {
      name: "Me",
      message: textRef.current.value
  })
  }

  return (
    <div className="body-container vertical-spacing">
      <div className="inbox-container">
        <div id="toggle-menu-contact" className="contact-box noselect" onClick= {() => changeChat()}>
          {contacts && contacts.map((item) => <MessagePreview key={item.name} id={item.id} name={item.name} message={item.messages[4].message} imageUrl={item.imageUrl} />)}
        </div>
        <div id="toggle-menu-chat" className="chat-box">
          <div className="chat-header">
            <button id="menu-contact" className="icon-previous">
              <img src="img/svg/angle-double-left.svg" alt="" />
            </button>
            <span className="chat-header-text">
              <p className="title-name">{contacts[chatPointer].name}</p>
            </span>
          </div>
          <div id="chat-container" className="chat-container">
            {chat && chat.map((item) => <Message key={item.name + `${i++}`} name={item.name} message={item.message} imageUrl={item.imageUrl} />)}
          </div>
          <div className="chat-terminal">
            <form>
              <TextInput ref = {textRef}placeholder="Enter Message" sx={{ width: '100%' }}></TextInput>
              <Button onClick={sendChat}>Send</Button>
            </form>
          </div>
        </div>
        <div className="about-box">
          <div className="about-header">
            <p className="about-header-text">About</p>
          </div>
          <div className="about-profile">
            <img className="profile-image" src="img/jpg/profile1.jpg" alt="" />
            <p className="message-name">Melissa Parks</p>
            <p className="message-content">
              I am a preceptor at Allegheny General Hospital in Pittsburgh, Pennsylvania. I have been a preceptor for over 10 years and have experience precepting students and residents in Psychiatric
              Mental Health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
