import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const NofificationContext = createContext();
const NotificationsProvider = ({ children }) => {
  const [notification, setNotification] = useState([]);
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io('http://localhost:3002');
    setSocket(newSocket);
    if (socket) {
      socket.on('connect', () => {
        console.log('connected');
      });
      socket.on('message', (message) => {
        console.log(message);
      });
    }
  }, [setSocket]);
  console.log(socket);
  return (
    <NofificationContext.Provider
      value={{
        notification,
        setNotification,
        socket,
      }}
    >
      {children}
    </NofificationContext.Provider>
  );
};

const useNotifications = () => {
  return useContext(NofificationContext);
};

export { NotificationsProvider, useNotifications };
