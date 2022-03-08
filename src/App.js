import Layout from 'components/layout';
import { ProviderAuth } from 'hooks/useAuth';
import LoginForm from 'components/forms/LoginForm';

import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useLocalStorageValue } from '@mantine/hooks';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from 'pages/Home';
import Messages from 'pages/Messages';
import Login from 'pages/Login';
import SignUp from 'pages/Signup';

export default function App() {
  const [colorScheme, setColorScheme] = useLocalStorageValue({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
  });
  const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <Router>
      <ProviderAuth>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
            <Layout>
            <Routes>
                <Route path="/connect" element={"Connect"}>Hello</Route>
                <Route path="/profile" element={"Profile"}></Route>
                <Route path="/messages" element={<Messages/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/signup" element={<SignUp/>}></Route>
                <Route path="/" element={<Home/>}></Route>
                <Route element={<Home/>}></Route>
              </Routes>
            </Layout>
          </MantineProvider>
        </ColorSchemeProvider>
      </ProviderAuth>
    </Router>
  );
}
