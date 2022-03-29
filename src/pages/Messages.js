import { Button, Input, TextInput, Menu, Loader } from '@mantine/core';
//import { Message, MessagePreview } from 'components/chat/Message';
import { RequireAuth } from 'hooks/useAuth';
import { useEffect, useRef, useState, React } from 'react';
import axios from 'axios';
import endPoints from 'services/api';
import '../css/chat.css';
import contacts from '../contacts.js';
import AvailableUser from 'components/chat/AvailableUsers';
import { Message } from 'components/chat/Message';
import { useQuery, useMutation } from 'react-query';
import { useAuth } from 'hooks/useAuth';

var chatPointer = 0;

export default function Messages() {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState();
  const userId = user.user.id;
  const messageQuery = useQuery('messages', async () => {
    axios.defaults.headers.api = `123`;
    axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    const { data } = await axios.get(endPoints.base + '/users/connections');
    return data;
  });
  const conversationQuery = useQuery(
    ['conversation', selectedChat],
    async () => {
      axios.defaults.headers.api = `123`;
      axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
      const { data } = await axios.get(endPoints.base + '/messages/' + selectedChat);
      return data;
    },
    { enabled: selectedChat != null }
  );

  const mutation = useMutation((newMessage, oldMessage) => {
    axios.defaults.headers.api = `123`;
    axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return axios.post(endPoints.base + '/messages/send', newMessage);
  });
  const textRef = useRef(null);

  function sendChat() {
    const data = {
      receiver: selectedChat,
      message: textRef.current.value,
    };
    mutation.mutate(data, {
      onSuccess: () => {
        conversationQuery.refetch();
      },
    });
  }
  return (
    <div className="grid place-items-center mx-11 my-11">
      <div className="flex flex-row border-solid border-2 border-gray-200 rounded-lg w-full max-w-[1192px] h-[75vh] shadow-lg">
        {/* Inbox section */}
        <div className="flex flex-col border-solid border-0 border-r-2 border-gray-200 rounded-tl-lg rounded-bl-lg w-[368px] h-full">
          <div className="relative flex items-center border-solid border-0 border-b-2 border-gray-200 justify-between rounded-tl-lg w-full max-h-[94px]">
            <p className="text-lg font-bold m-auto pl-14 justify-self-cente py-5">Inbox</p>
            {/* This p tag will be a button that will allow the user to sort by read/unread */}
            {/* <p className="text-lg font-bold w-14 pr-5 cursor-pointer">...</p> */}
            <Menu className="mr-4" closeOnScroll={true}>
              <Menu.Item>Inbox</Menu.Item>
              <Menu.Item>Unread</Menu.Item>
              <Menu.Item>Archived</Menu.Item>
            </Menu>
          </div>
          <div className="overflow-hidden overflow-y-auto h-full">
            {/* Inbox item components will be rendered here */}
            {messageQuery.isLoading ? (
              <Loader />
            ) : (
              messageQuery.data.map((item) => {
                const username = item.requestedTo.id === userId ? item.requester.username : item.requestedTo.username;
                const connectionId = item.requestedTo.id === userId ? item.requester.id : item.requestedTo.id;
                return <AvailableUser handleClick={setSelectedChat} key={item.id} connectionId={connectionId} username={username} />;
              })
            )}
          </div>
        </div>
        {/* Message section */}
        <div className="flex flex-col rounded-tr-lg rounded-br-lg w-full h-full">
          <div className="relative flex items-center border-solid border-0 border-b-2 border-gray-200 justify-between rounded-tr-lg w-full max-h-[94px]">
            <p className="text-lg font-bold m-auto pl-14 justify-self-center py-5">@Username</p>
            {/* This p tag will be a button that will allow the user to sort by read/unread */}
            <Menu className="mr-4">
              <Menu.Item>Archive</Menu.Item>
              <Menu.Item>Report</Menu.Item>
            </Menu>
          </div>
          <div className="overflow-hidden overflow-y-auto h-full">
            {/* Message item components will be rendered here */}

            {conversationQuery.isIdle ? <div>Pick a chat</div> : <div></div>}
            {!conversationQuery.isIdle && conversationQuery.isLoading ? <Loader /> : <div></div>}
            {conversationQuery.data && conversationQuery.data?.length > 0 && conversationQuery.data[0].messages.map((item) => <Message key={item.id} message={item.message} />)}
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
  );
}
