import { useEffect, useState } from 'react';
import { createStyles, AppShell, Header, Navbar, Burger, MediaQuery, Anchor, Image } from '@mantine/core';
import { Link, NavLink } from 'react-router-dom';

import logo from '../../img/logo.png';

import { useAuth } from 'hooks/useAuth';
import { useNotifications } from 'hooks/useNotification';
import axios from 'axios';

const useStyles = createStyles((theme) => ({
  navbar: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
  header: {
    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  link: {
    color: theme.colors.teal[7],
    fontSize: 14,
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    textDecoration: 'none',
    width: 'fit-content',
    [`&:hover`]: {
      backgroundColor: 'grey',
      color: 'white',
      textDecoration: 'none',
    },
  },
  active: {
    backgroundColor: theme.colors.teal[5],
    color: 'white',
  },
  links: {
    paddingRight: 35,
    textDecoration: 'none',
    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      display: 'none',
    },
  },
}));

export default function Layout({ children }) {
  axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  axios.defaults.headers.api = `123`;
  const { classes, cx } = useStyles();
  const [opened, setOpened] = useState(false);
  const auth = useAuth();
  const { notification } = useNotifications();
  const [navigation, setNavigation] = useState([]);
  useEffect(() => {
    if (!auth.user) {
      setNavigation([
        { name: 'Home', href: '/', current: true },
        { name: 'Login', href: '/login', current: false },
        { name: 'Sign Up', href: '/signup', current: false },
      ]);
    } else {
      setNavigation([
        { name: 'Home', href: '/', current: true },
        { name: 'Connect', href: '/connect', current: false },
        { name: 'Profile', href: '/profile', current: false },
        { name: 'Messages', href: '/messages', current: false },
        { name: 'Assessment', href: '/assessment', current: false },
        { name: 'Upload', href: '/upload', current: false },
        { name: 'Log out', href: '/logout', current: false },
      ]);
    }
  }, [auth]);
  const menuItems = navigation.map((item) => {
    if (item.name === 'Log out')
      return (
        <Anchor key={item.name} onClick={auth.logout} className={classes.link}>
          Logout
        </Anchor>
      );
    return (
      <NavLink to={item.href} key={item.name} className={({ isActive }) => (isActive ? cx(classes.link, classes.active) : classes.link)}>
        {item.name}
      </NavLink>
    );
  });
  const navbarItems = navigation.map((item) => {
    if (item.name === 'Log out')
      return (
        <Anchor key={item.name} onClick={auth.logout} className={classes.link}>
          Logout
        </Anchor>
      );
    return (
      <NavLink onClick={() => setOpened((o) => !o)} to={item.href} key={item.name + 'nav'} className={({ isActive }) => (isActive ? cx(classes.link, classes.active) : classes.link)}>
        {item.name}
      </NavLink>
    );
  });
  return (
    <AppShell
      fixed
      navbarOffsetBreakpoint="sm"
      padding={0}
      header={
        <Header height={60} className={classes.header}>
          <div style={{ width: 80 }} className="ml-7 lg:ml-14">
            <Anchor component={Link} to="/">
              <Image src={logo} />
            </Anchor>
          </div>
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Burger opened={opened} onClick={() => setOpened((o) => !o)} size="lg" mr="lg" ml="lg" />
          </MediaQuery>
          <div className={classes.links}>
            {menuItems}
            {notification > 0 ? (
              <div className="relative h-">
                <span className="w-3 h-3 bg-red-500 rounded-full absolute left-[337px] top-.5 bottom-3"></span>{' '}
              </div>
            ) : (
              <span></span>
            )}
          </div>
        </Header>
      }
      navbar={
        <Navbar className={classes.navbar} width={{ base: '100%', sm: 0 }} hidden={!opened}>
          {navbarItems}
        </Navbar>
      }
    >
      {children}
    </AppShell>
  );
}
