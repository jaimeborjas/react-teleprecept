import { Menu, Loader, Button, Text, Modal, Title, ScrollArea, Group, Textarea } from '@mantine/core';
//import { Message, MessagePreview } from 'components/chat/Message';
import { useRef, useState, useEffect, React } from 'react';
import axios from 'axios';
import endPoints from 'services/api';
import AvailableUser from 'components/chat/AvailableUsers';
import { Message } from 'components/chat/Message';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { useAuth } from 'hooks/useAuth';
import { ArrowLeftIcon } from '@modulz/radix-icons';
import { useNotifications } from 'hooks/useNotification';

//import { timeUntilStale } from 'react-query/types/core/utils';
// require('./../services/socket');

var socket;
var selectedChatCompare;
// TODO: Scroll to Botton when sending a message and when first uploading the messages, we need to make the images dynamic
export default function Messages() {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState();
  const [activeChat, setActiveChat] = useState();
  const [open, setOpened] = useState(false);
  const [openModal, setOpenedModal] = useState(false);

  const [socketConnected, setSocketConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState(null);
  const userId = user.user.id;
  const textRef = useRef(null);
  const chatRef = useRef(null);

  useEffect(() => {
    socket = io(endPoints.base, {
      extraHeaders: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    socket.emit('setup', user);
    socket.on('connected', () => {
      setSocketConnected(true);
      console.log('re');
    });
    return () => socket.disconnect();
    // eslint-disable-next-line
  }, []);

  const messageQuery = useQuery('messages', async () => {
    axios.defaults.headers.api = `123`;
    axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    const { data } = await axios.get(endPoints.base + '/users/connections');
    console.log(data);
    return data;
  });
  const { notification, setNotification } = useNotifications();
  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);
      axios.defaults.headers.api = `123`;
      axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
      const { data } = await axios.get(endPoints.base + '/messages/' + selectedChat.connectionId);
      setActiveChat(data[0].id);
      selectedChatCompare = data[0].id;
      setMessages(data[0].messages);
      socket.emit('join chat', data[0].id);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
    // eslint-disable-next-line
  }, [messages]);

  useEffect(() => {
    socket.on('message received', (newMessageRecieved) => {
      console.log(newMessageRecieved);
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare !== newMessageRecieved.id
      ) {
         if (!notification.includes(newMessageRecieved.id)) {
              setNotification([newMessageRecieved.message.senderId, ...notification])
          }
        return;
      } else {
        if (messages) setMessages([...messages, newMessageRecieved.message]);
      }
    });
  });

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
      onSuccess: (data) => {
        socket.emit('new message', { id: activeChat, message: data.data });
        setMessages([...messages, data.data]);
      },
    });

    textRef.current.value = '';
    chatRef.current?.scrollIntoView();
  }

  const handleSelect = async (id) => {
    setOpened(true);
    setSelectedChat(id);
    console.log(id);
    let checkId = id.connectionId;
    setNotification(notification.filter(n => n != checkId));

  };

  const submitHanlder = async (event) => {
    event.preventDefault();
    //reoprtUser();
    setOpenedModal(false);
  };
  return (
    <div className="grid place-items-center mx-5 md:mx-11 my-11">
      <div className="flex flex-row border-solid border-2 border-gray-200 rounded-lg w-full max-w-[1192px] h-[75vh] shadow-lg">
        {/* Inbox section */}
        <div className={`${open ? 'hidden' : 'flex'} md:flex flex-col border-solid border-0 border-r-2 border-gray-200 rounded-tl-lg rounded-bl-lg w-full md:w-[258px] lg:w-[368px] h-full`}>
          <div className="relative flex items-center border-solid border-0 border-b-2 border-gray-200 justify-between rounded-tl-lg w-full max-h-[94px]">
            <p className="text-lg font-bold m-auto justify-self-cente py-5">Inbox</p>
          </div>
          <div className="overflow-hidden overflow-y-auto h-full">
            {/* Inbox item components will be rendered here */}
            {messageQuery.isLoading ? (
              <Loader />
            ) : (
              messageQuery.data.map((item, rank, i) => {
                const username = item.requestedTo.id === userId ? item.requester.username : item.requestedTo.username;
                const connectionId = item.requestedTo.id === userId ? item.requester.id : item.requestedTo.id;
                let notif = notification.includes(connectionId);
                return <AvailableUser handleClick={handleSelect} key={item.id} id={item.id} connectionId={connectionId} username={username} notif={notif}/>;
              })
            )}
          </div>
        </div>
        <Modal opened={openModal} onClose={() => setOpenedModal(false)}>
          <Title align="center">Report a User</Title>
          <ScrollArea className="mt-10" offsetScrollbars type="always" style={{ height: 200 }}>
            <Group className="flex flex-col" position="center" spacing="sm">
              <Textarea placeholder="Inappropriate Content, Spam, Other..." label="Reason for Report" autosize required />
              <Button loading={mutation.isLoading} onClick={submitHanlder} color="red">
                Submit
              </Button>
            </Group>
          </ScrollArea>
        </Modal>
        {/* Message section */}
        <div className={`md:flex flex-col rounded-tr-lg rounded-br-lg w-full ${open ? 'flex' : 'hidden'} h-full`}>
          <div className="relative flex items-center border-solid border-0 border-b-2 border-gray-200 justify-between rounded-tr-lg w-full max-h-[94px]">
            <Button variant="outline" leftIcon={<ArrowLeftIcon />} onClick={() => setOpened((o) => !o)} className={`ml-5 md:hidden`}>
              Back
            </Button>
            <p className="text-lg font-bold m-auto pl-14 justify-self-center py-5">{selectedChat?.username}</p>
            {/* This p tag will be a button that will allow the user to sort by read/unread */}
            {activeChat && (
              <Menu className="mr-4">
                <Menu.Item onClick={() => setOpenedModal((o) => !o)}>Report</Menu.Item>
                <Menu.Item component="a" href={`/timesheet/${selectedChat.id}`}>
                  Timesheet
                </Menu.Item>
              </Menu>
            )}
          </div>
          <div ref={chatRef} className="overflow-auto overflow-y-auto h-full p-[18px]">
            {/* Message item components will be rendered here */}
            {!selectedChat ? (
              <Text align="center" className="m-auto mt-10">
                Select a conversation
              </Text>
            ) : (
              <div></div>
            )}
            {/**user.user.id ==  */}
            {loading ? <Loader /> : <div></div>}
            {messages && messages?.length > 0 && messages.map((item) => <Message key={item.id} message={item} receiverId={selectedChat.connectionId} senderId={userId} />)}
            {messages && messages?.length == 0 && (
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
                  <input placeholder="Type your message..." className="border-0 outline-0 w-full h-full rounded-lg shadow-lg p-2" type="text" maxLength="100" ref={textRef} />
                  <button type="submit" className="border-0 outline-0 bg-teal-600 rounded-lg hover:bg-teal-500 transition duration-300 cursor-pointer">
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
