import { Notification, Group, Button, TextInput, Title, PasswordInput, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Cross1Icon, LockClosedIcon } from '@modulz/radix-icons';
import { useAuth } from 'hooks/useAuth';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import endPoints from 'services/api';
import { useMutation } from 'react-query';
import axios from 'axios';

export default function SignUpForm() {
  const mutation = useMutation((newUser) => {
    axios.defaults.headers.api = `123`;
    return axios.post(endPoints.base + '/auth/signup', newUser);
  });
  const auth = useAuth();

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      role: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      confirmPassword: (value, values) => (value !== values.password ? 'Passwords did not match' : null),
    },
  });
  const handleSubmit = async (values) => {
    const data = {
      email: values.email,
      password: values.password,
      role: values.role,
      userInfo: {
        firstName: values.firstName,
        lastName: values.lastName,
      },
    };
    await mutation.mutate(data, {
      onSuccess: () => {
        auth.signIn(values.email, values.password).then(() => {
          navigate('/profile', { replace: true });
        });
      },
    });
  };
  return (
    <div className="h-fit space-y-4">
      <Title align="center">Create an account</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group className="w-full mt-10 flex flex-row">
          <TextInput {...form.getInputProps('firstName')} className="w-48" size="sm" placeholder="First Name" label="First Name" required />
          <TextInput {...form.getInputProps('lastName')} className=" w-48" size="sm" placeholder="Last Name" label="Last Name" required />
        </Group>
        <Select
          size="sm"
          label="Role"
          placeholder="Role"
          searchable
          data={[
            { value: 'preceptor', label: 'Preceptor' },
            { value: 'student', label: 'Student' },
          ]}
          {...form.getInputProps('role')}
          required
        />
        <TextInput {...form.getInputProps('email')} placeholder="Email Address" label="Email Address" type="email" required />
        <PasswordInput
          {...form.getInputProps('password')}
          icon={<LockClosedIcon />}
          placeholder="Password"
          label="Password"
          description="Password must include at least one letter, number and special character"
          required
        />
        <PasswordInput {...form.getInputProps('confirmPassword')} icon={<LockClosedIcon />} placeholder="Confirm Password" label="Confirm Password" required />
        {mutation.isError && (
          <Notification onClose={() => mutation.reset()} icon={<Cross1Icon />} color="red">
            {JSON.stringify(mutation.error.message)}
          </Notification>
        )}
        <Group sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="submit" color="blue" loading={mutation.isLoading} style={{ marginTop: 14 }}>
            Create account
          </Button>
        </Group>
      </form>
    </div>
  );
}
