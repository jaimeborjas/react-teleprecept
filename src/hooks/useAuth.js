import React, { useState, useContext, createContext } from 'react';
import axios from 'axios';
import endPoints from 'services/api/';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

// @ts-ignore
const AuthContext = createContext();

export function ProviderAuth({ children }) {
  const userData = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(userData);
  const signIn = async (email, password) => {
    const options = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        api: 123,
      },
    };
    const { data: access_token } = await axios.post(endPoints.auth.login, { email, password }, options);
    if (access_token) {
      const token = access_token.token;
      localStorage.setItem('token', token);
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      axios.defaults.headers.api = `123`;
      const { data: user } = await axios.get(endPoints.auth.profile);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.Authorization;
    window.location.href = '/login';
  };
  const auth = { user, signIn, logout };
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
