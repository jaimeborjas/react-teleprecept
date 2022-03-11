import Layout from 'components/layout';
import { ProviderAuth, RequireAuth } from 'hooks/useAuth';

import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useLocalStorageValue } from '@mantine/hooks';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from 'pages/Home';
import Messages from 'pages/Messages';
import Login from 'pages/Login';
import SignUp from 'pages/Signup';
import Profile from 'pages/Profile';

export default function App() {
  const [colorScheme, setColorScheme] = useLocalStorageValue({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
  });
  // @ts-ignore
  const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <Router>
      <ProviderAuth>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
            <Layout>
              <Routes>
                <Route path="/connect" element={'Connect'}>
                  Hello
                </Route>
                <Route
                  path="/profile"
                  element={
                    <RequireAuth>
                      <Profile />
                    </RequireAuth>
                  }
                ></Route>
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
                <Route path="/" element={<Home />}></Route>
                <Route element={<Home />}></Route>
              </Routes>
            </Layout>
          </MantineProvider>
        </ColorSchemeProvider>
      </ProviderAuth>
    </Router>
  );
}
