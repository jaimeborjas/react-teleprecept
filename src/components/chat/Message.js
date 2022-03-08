import React from 'react';
// import '../../css/chat.css';

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

const MessagePreview = ({ name, message, imageUrl }) => {
  return (
    <div className="contact-item pointer pointer-hover">
      <img className="profile-image" src={imageUrl} alt="/" />
      <span>
        <p>{name}</p>
        <p className="text-preview">{message}</p>
      </span>
    </div>
  );
};

export { Message, MessagePreview };
