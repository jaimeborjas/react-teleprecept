import { Button, Input, TextInput } from '@mantine/core';
import { Message, MessagePreview } from 'components/chat/Message';
import React from 'react'
import '../css/chat.css';
export default function Messages() {
  const messagePreview = [
    {
      name: "Melissa Park",
      message: "Ok awesome I look forward to hearing from you soon!",
    },
    {
      name: "Darren Englan",
      message: "Ok awesome I look forward to hearing from you soon!",
    },
    {
      name: "Kiran Fowler",
      message: "Ok awesome I look forward to hearing from you soon!",
    },
  ]
  const messages = [
    {
      name: "Melissa Parks",
      message: "Your resume is really impressive! Do you have time to talk about a possible preceptorship for the upcoming year",
    },
    {
      name: "Me",
      message: "I would love to talk about a preceptorship! I am available for the upcoming year.",
    },
    {
      name: "Melissa Parks",
      message: "Great! When do you think would be a good time to talk?",
    },
    {
      name: "Me",
      message: "I am available for a call any time this week",
    },
    {
      name: "Melissa Parks",
      message: "Ok awesome I look forward to hearing from you soon!",
    },
  ]
  messagePreview.forEach((message) => message.imageUrl = `https://ui-avatars.com/api/?name=${message.name}`)
  messages.forEach((message) => message.imageUrl = `https://ui-avatars.com/api/?name=${message.name}`)
  const messagePreviewComponents  = messagePreview.map((item) => <MessagePreview key={item.name} name={item.name} message={item.message} imageUrl={item.imageUrl} />)
  const messageComponents  = messages.map((item) => <Message key={item.name} name={item.name} message={item.message} imageUrl={item.imageUrl} />)

  return (
    <div className="body-container vertical-spacing">
					<div className="inbox-container">
						<div id="toggle-menu-contact" className="contact-box noselect">
              {messagePreviewComponents}
						</div>
						<div id="toggle-menu-chat"className="chat-box">
							<div className="chat-header">
									<button id="menu-contact" className="icon-previous"><img src="img/svg/angle-double-left.svg" alt=""/></button>
								<span className="chat-header-text">
									<p className="title-name">Melissa Parks</p>
									<p className="title-status">Status: Online</p>
								</span>
							</div>
							<div id="chat-container" className="chat-container">
                {messageComponents}
							</div>
							<div className="chat-terminal">
								<form >
									<TextInput placeholder="Enter Message" sx={{ width:"100%"}}></TextInput>
                  <Button>Send</Button>
								</form>
							</div>
						</div>
						<div className="about-box">
							<div className="about-header">
								<p className="about-header-text">About</p>
							</div>
							<div className="about-profile">
								<img className="profile-image" src="img/jpg/profile1.jpg" alt=""/>
								<p className="message-name">Melissa Parks</p>
								<p className="message-content">I am a preceptor at Allegheny General Hospital in Pittsburgh, Pennsylvania. I have been a preceptor for over 10 years and have experience precepting students and residents in Psychiatric Mental Health.</p>
							</div>
						</div>
					</div>
				</div>
  )
}
