import Layout from 'components/layout';
import { ProviderAuth } from 'hooks/useAuth';
import { NotificationsProvider } from 'hooks/useNotification';

import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useLocalStorageValue } from '@mantine/hooks';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from 'pages/Home';
import Messages from 'pages/Messages';
import Login from 'pages/Login';
import SignUp from 'pages/Signup';
import Profile from 'pages/Profile';
import Assessment from 'pages/Assessment';
import Connect from 'pages/Connect';
import Upload from 'pages/Upload';
import Timetable from 'pages/Timetable';
import { RecoverPassword } from 'components/forms/RecoverPassword';
import { ChangePassword } from 'components/forms/ChangePassword';
import { useEffect, useState } from 'react';
import endPoints from 'services/api';

export default function App() {
  const [colorScheme, setColorScheme] = useLocalStorageValue({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
  });
  // @ts-ignore
  const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <Router>
      <NotificationsProvider>
        <ProviderAuth>
          <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider
              withGlobalStyles
              withNormalizeCSS
              theme={{
                colorScheme,
                fontFamily: 'Roboto',
                fontFamilyMonospace: 'Roboto',
                primaryColor: 'teal',
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
                  <Route path="/timesheet" element={<Timetable />}></Route>
                  <Route path="/profile" element={<Profile />}></Route>
                  <Route path="timesheet">
                    <Route path=":id" element={<Timetable />}></Route>
                  </Route>
                  <Route path="/messages" element={<Messages />}></Route>
                  <Route path="/upload" element={<Upload />}></Route>
                  <Route path="/assessment" element={<Assessment />}></Route>
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
      </NotificationsProvider>
    </Router>
  );
}
