import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NofificationContext = createContext();
const NotificationsProvider = ({ children }) => {
  const [notification, setNotification] = useState([]);

  return (
    <NofificationContext.Provider
      value={{
        notification,
        setNotification,
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
