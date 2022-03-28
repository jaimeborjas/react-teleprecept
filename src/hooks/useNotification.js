import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from 'services/socket';

const NofificationContext = createContext();
const NotificationsProvider = ({ children }) => {
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    socket.on('message', (message) => {
      setNotification([message]);
    });
  }, []);
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
