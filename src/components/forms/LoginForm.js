import { useState } from 'react';
import { Modal, Button, Group, TextInput, createStyles } from '@mantine/core';
import { Badge, Card, Text, Image, useMantineTheme, Paper, Title, PasswordInput, Select } from '@mantine/core';
import { EyeClosedIcon, LockClosedIcon } from '@modulz/radix-icons';

const LoginFormModal = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <LoginForm />
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
      </Group>
    </>
  );
}

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

const LoginForm = () => {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  const secondaryColor = theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];
  return (
    <Paper>
        <Title align="center">Log In</Title>
        <TextInput placeholder="Email Address" label="Email Address" type="email" required />
        <PasswordInput icon={<LockClosedIcon />} placeholder="Password" label="Password" description="Password must include at least one letter, number and special character" required />
        <Group sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button color="blue" style={{ marginTop: 14 }}>
            Log In
          </Button>
        </Group>
        </Paper>
  )
}


export {LoginFormModal, LoginForm}