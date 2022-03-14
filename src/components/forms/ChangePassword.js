import { Anchor, Button, Card, Group, Notification, PasswordInput, Text, Title } from '@mantine/core';
import { Cross1Icon, LockClosedIcon } from '@modulz/radix-icons';
import { useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useForm } from '@mantine/form';
import endPoints from 'services/api';

const ChangePassword = () => {
  const passwordRef = useRef(null);
  const [message, setMessage] = useState(null);
  let [searchParams, setSearchParams] = useSearchParams();
  const form = useForm({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: {
      confirmPassword: (value, values) => (value !== values.password ? 'Passwords did not match' : null),
    },
  });

  const mutation = useMutation((newUser) => {
    axios.defaults.headers.api = `123`;
    return axios.post(endPoints.base + '/auth/change-password', newUser);
  });

  const submitHanlder = async (values) => {
    const password = values.password;
    const data = {
      token: searchParams.get('token'),
      newPassword: password,
    };
    mutation.mutate(data, {
      onSuccess: () => {
        setMessage('Your password has been change');
      },
    });
  };

  return (
    <div className="m-auto flex items-center justify-center lg:w-2/3">
      <Card radius={10} shadow="sm" padding="lg" className="mt-9 lg:w-2/3 md:w-2/3 w-4/5">
        {message ? (
          <Text>
            {message}
            <Anchor component={Link} to="/login">
              Login
            </Anchor>
          </Text>
        ) : (
          <div className="h-fit space-y-4">
            <Title order={2} align="center">
              Change your password
            </Title>
            <form onSubmit={form.onSubmit(submitHanlder)}>
              <PasswordInput
                {...form.getInputProps('password')}
                ref={passwordRef}
                icon={<LockClosedIcon />}
                placeholder="Password"
                label="Password"
                description="Password must include at least one letter, number and special character"
                required
              />
              <PasswordInput {...form.getInputProps('confirmPassword')} icon={<LockClosedIcon />} placeholder="Confirm Password" label="Confirm Password" required />

              {mutation.isError && (
                <Notification onClose={() => mutation.reset()} icon={<Cross1Icon />} color="red">
                  {JSON.stringify(mutation.error.response.data.message)}
                </Notification>
              )}
              <Group className="flex justify-center">
                <Button type="submit" color="blue" className="mt-5" loading={mutation.isLoading}>
                  Recover
                </Button>
              </Group>
            </form>
          </div>
        )}
      </Card>
    </div>
  );
};

export { ChangePassword };
