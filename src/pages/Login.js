import { Badge, Card, Text, Image, Group, Button, useMantineTheme, Paper, createStyles, TextInput, Title, PasswordInput, Select } from '@mantine/core';
import { EyeClosedIcon, LockClosedIcon } from '@modulz/radix-icons';
import { LoginForm } from 'components/forms/LoginForm';
import React from 'react';

const useStyles = createStyles((theme) => ({
  main: {
    width: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center ',
    height: '80vh',
    margin: 'auto',
  },
  card: {
    width: 340,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function Login() {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  const secondaryColor = theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];
  return (
    <Paper className={classes.main}>
      <Card shadow="sm" padding="lg">
        <LoginForm/>
      </Card>
    </Paper>
  );
}
