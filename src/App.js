import Layout from 'components/layout';
import { ProviderAuth, RequireAuth } from 'hooks/useAuth';
import { QueryClient, QueryClientProvider } from 'react-query';
import io from 'socket.io-client';

import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useLocalStorageValue } from '@mantine/hooks';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from 'pages/Home';
import Messages from 'pages/Messages';
import Login from 'pages/Login';
import SignUp from 'pages/Signup';
import Profile from 'pages/Profile';
import Connect from 'pages/Connect';
import { RecoverPassword } from 'components/forms/RecoverPassword';
import { ChangePassword } from 'components/forms/ChangePassword';
import { useEffect, useState } from 'react';

const queryClient = new QueryClient();

export default function App() {
  const [colorScheme, setColorScheme] = useLocalStorageValue({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
  });
  // @ts-ignore
  const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  useEffect(() => {
    const socket = io('http://localhost:3002/');
    if (socket) {
      socket.on('connect', () => {
        console.log('connected to the socket');
      });
      socket.on('message', (message) => console.log(message));
    }
    return () => socket.disconnect();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ProviderAuth>
          <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider
              withGlobalStyles
              withNormalizeCSS
              theme={{
                colorScheme,
                fontFamily: 'Roboto',
                fontFamilyMonospace: 'Roboto',
                headings: {
                  fontFamily: 'Poppins',
                },
              }}
            >
              <Layout>
                <Routes>
                  <Route path="/connect" element={<Connect />}>
                    Hello
                  </Route>
                  <Route path="/profile" element={<Profile />}></Route>
                  <Route
                    path="/messages"
                    element={
                      <RequireAuth>
                        <Messages />
                      </RequireAuth>
                    }
                  ></Route>
                  <Route path="/login" element={<Login />}></Route>
                  <Route path="/signup" element={<SignUp />}></Route>
                  <Route path="/recover" element={<RecoverPassword />}></Route>
                  <Route path="/change-password" element={<ChangePassword />}></Route>
                  <Route path="/" element={<Home />}></Route>
                  <Route element={<Home />}></Route>
                </Routes>
              </Layout>
            </MantineProvider>
          </ColorSchemeProvider>
        </ProviderAuth>
      </Router>
    </QueryClientProvider>
  );
}
