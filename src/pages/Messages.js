import { Menu, Loader, Button, Text } from '@mantine/core';
//import { Message, MessagePreview } from 'components/chat/Message';
import { useRef, useState, React } from 'react';
import axios from 'axios';
import endPoints from 'services/api';
import AvailableUser from 'components/chat/AvailableUsers';
import { Message } from 'components/chat/Message';
import { useQuery, useMutation } from 'react-query';
import { useAuth } from 'hooks/useAuth';
import { ArrowLeftIcon } from '@modulz/radix-icons';

// TODO: Scroll to Botton when sending a message and when first uploading the messages, we need to make the images dynamic
export default function Messages() {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState();
  const [open, setOpened] = useState('hidden');
  const userId = user.user.id;
  const textRef = useRef(null);
  const chatRef = useRef(null);

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
      const { data } = await axios.get(endPoints.base + '/messages/' + selectedChat.connectionId);
      return data;
    },
    { enabled: selectedChat != null }
  );

  const mutation = useMutation((newMessage, oldMessage) => {
    axios.defaults.headers.api = `123`;
    axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return axios.post(endPoints.base + '/messages/send', newMessage);
  });

  function sendChat(event) {
    event.preventDefault();
    const data = {
      receiver: selectedChat.connectionId,
      message: textRef.current.value,
    };
    mutation.mutate(data, {
      onSuccess: () => {
        conversationQuery.refetch();
      },
    });
    textRef.current.value = '';
    chatRef.current?.scrollIntoView();
  }

  const handleSelect = (id) => {
    setOpened(true);
    setSelectedChat(id);
  };
  return (
    <div className="grid place-items-center mx-5 md:mx-11 my-11">
      <div className="flex flex-row border-solid border-2 border-gray-200 rounded-lg w-full max-w-[1192px] h-[75vh] shadow-lg">
        {/* Inbox section */}
        <div className={`${open ? 'hidden' : 'flex'} md:flex flex-col border-solid border-0 border-r-2 border-gray-200 rounded-tl-lg rounded-bl-lg w-full md:w-[258px] lg:w-[368px] h-full`}>
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
              messageQuery.data.map((item, rank, i) => {
                const username = item.requestedTo.id === userId ? item.requester.username : item.requestedTo.username;
                const connectionId = item.requestedTo.id === userId ? item.requester.id : item.requestedTo.id;
                return <AvailableUser handleClick={handleSelect} key={item.id} connectionId={connectionId} username={username} />;
              })
            )}
          </div>
        </div>
        {/* Message section */}
        <div className={`md:flex flex-col rounded-tr-lg rounded-br-lg w-full ${open ? 'flex' : 'hidden'} h-full`}>
          <div className="relative flex items-center border-solid border-0 border-b-2 border-gray-200 justify-between rounded-tr-lg w-full max-h-[94px]">
            <Button variant="outline" leftIcon={<ArrowLeftIcon />} onClick={() => setOpened((o) => !o)} className={`ml-5 md:hidden`}>
              Back
            </Button>
            <p className="text-lg font-bold m-auto pl-14 justify-self-center py-5">{selectedChat?.username}</p>
            {/* This p tag will be a button that will allow the user to sort by read/unread */}
            <Menu className="mr-4">
              <Menu.Item>Archive</Menu.Item>
              <Menu.Item>Report</Menu.Item>
            </Menu>
          </div>
          <div className="overflow-hidden overflow-y-auto h-full">
            {/* Message item components will be rendered here */}
            {conversationQuery.isIdle ? (
              <Text align="center" className="m-auto mt-10">
                Select a conversation
              </Text>
            ) : (
              <div></div>
            )}
            {!conversationQuery.isIdle && conversationQuery.isLoading ? <Loader /> : <div></div>}
            {conversationQuery.data && conversationQuery.data?.length > 0 && conversationQuery.data[0].messages.map((item) => <Message key={item.id} message={item.message} />)}
            {conversationQuery.data && conversationQuery.data?.length == 0 && (
              <Text align="center" className="m-auto mt-10">
                The Conversation is Empty
              </Text>
            )}
          </div>
          {/* Form section, message form, submit message button */}
          {selectedChat && (
            <form onSubmit={sendChat}>
              <div className="w-full border-solid border-0 border-t-2 border-gray-200 rounded-br-lg h-[100px]">
                <div className="flex flex-row justify-between items-center h-full p-5 gap-4">
                  <input placeholder="Enter a Message" className="border-0 outline-0 w-full h-full rounded-lg shadow-lg p-2" type="text" ref={textRef} />
                  <button type="submit" className="border-0 outline-0 bg-sky-600 rounded-lg hover:bg-sky-500 transition duration-300 cursor-pointer">
                    <p className="text-lg p-2 m-0 text-white">Send</p>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
