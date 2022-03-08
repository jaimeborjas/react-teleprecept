import { useState } from 'react';
import { createStyles, AppShell, Header, Navbar, Burger, MediaQuery, Anchor, ActionIcon } from '@mantine/core';
import { BrowserRouter as Router, Link,Routes ,Route, NavLink} from 'react-router-dom';

import Home from 'pages/Home';

import { SunIcon, MoonIcon } from '@modulz/radix-icons';


const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Connect', href: '/connect', current: false },
  { name: 'Profile', href: '/profile', current: false },
  { name: 'Messages', href: '/messages', current: false },
  { name: 'Login', href: '/login', current: false },
  { name: 'Sign Up', href: '/signup', current: false },
  
];

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
    justifyContent: 'flex-end',
  },

  link: {
    color: theme.colors.blue[9],
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
  active:{
    backgroundColor: theme.colors.blue[5],
    color: "white"
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
  const { classes, cx } = useStyles();
  const [opened, setOpened] = useState(false);
  let activeStyle = {
      textDecoration: "underline"
  }
  const menuItems = navigation.map((item) => {
    return <NavLink to={item.href} key={item.name} className={({isActive}) => isActive ? cx(classes.link, classes.active) : classes.link}>{item.name}</NavLink>;
  });
  return (
    // <Router>
      <AppShell
        fixed
        navbarOffsetBreakpoint="sm"
        header={
          <Header height={60} className={classes.header}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger opened={opened} onClick={() => setOpened((o) => !o)} size="lg" mr="lg" ml="lg" />
            </MediaQuery>
            <div className={classes.links}>{menuItems}</div>
          </Header>
        }
        navbar={
          <Navbar className={classes.navbar} width={{ base: '100%', sm: 0 }} hidden={!opened}>
            {menuItems}
          </Navbar>
        }
      >
      {children}
      </AppShell>
      // </Router>
  );
}
