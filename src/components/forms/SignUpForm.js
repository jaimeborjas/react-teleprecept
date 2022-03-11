import { Card, Group, Button, useMantineTheme, Paper, createStyles, TextInput, Title, PasswordInput, Select } from '@mantine/core';
import { LockClosedIcon } from '@modulz/radix-icons';

import React from 'react';

export default function SignUpForm() {
  return (
    <div>
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
      <PasswordInput icon={<LockClosedIcon />} placeholder="Password Repeat" label="Password Repeat" required />

      <Group sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button color="blue" style={{ marginTop: 14 }}>
          Log In
        </Button>
      </Group>
    </div>
  );
}
