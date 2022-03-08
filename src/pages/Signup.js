import { Card, Group, Button, useMantineTheme, Paper, createStyles, TextInput, Title, PasswordInput, Select } from '@mantine/core';
import {  LockClosedIcon } from '@modulz/radix-icons';
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

export default function SignUp() {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  const secondaryColor = theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];
  return (
    <Paper className={classes.main}>
      <Card shadow="sm" padding="lg">
        <Title align="center">Log In</Title>
        <Group>
          <TextInput size="md" placeholder="First Name" label="First Name" required />
          <TextInput placeholder="Last Name" label="Last Name" required />
        </Group>
        <Select
          label="Role"
          placeholder="Role"
          searchable
          data={[
            { value: 'preceptor', label: 'Preceptor' },
            { value: 'student', label: 'Student' },
          ]}
          required
        />
        <TextInput placeholder="Email Address" label="Email Address" type="email" required />
        <PasswordInput icon={<LockClosedIcon />} placeholder="Password" label="Password" description="Password must include at least one letter, number and special character" required />
        <PasswordInput icon={<LockClosedIcon />} placeholder="Password Repeat" label="Password Repeat" description="Password must include at least one letter, number and special character" required />

        <Group sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button color="blue" style={{ marginTop: 14 }}>
            Log In
          </Button>
        </Group>
      </Card>
    </Paper>
  );
}
