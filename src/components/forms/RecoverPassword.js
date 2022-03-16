import { Anchor, Button, Card, Group, Notification, Text, TextInput, Title } from '@mantine/core';
import { Cross1Icon } from '@modulz/radix-icons';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import axios from 'axios';
import endPoints from 'services/api';

const RecoverPassword = () => {
  const emailRef = useRef(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const mutation = useMutation((newUser) => {
    axios.defaults.headers.api = `123`;
    return axios.post(endPoints.base + '/auth/recovery', newUser);
  });

  const submitHanlder = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    mutation.mutate(
      { email: email },
      {
        onSuccess: () => {
          navigate('/login');
        },
      }
    );
  };
  if (mutation.isError) console.log(mutation);
  return (
    <div className="m-auto flex items-center justify-center lg:w-2/3">
      <Card radius={10} shadow="sm" padding="lg" className="mt-9 lg:w-2/3 md:w-2/3 w-4/5">
        {message ? (
          <Text>{message}</Text>
        ) : (
          <div className="h-fit space-y-4">
            <Title order={2} align="center">
              Recover your password
            </Title>
            <TextInput ref={emailRef} placeholder="Email Address" label="Email Address" type="email" required />
            <div className="mt-3  flex justify-center flex-col items-center">
              <Anchor component={Link} to="/login" className="">
                Sign In
              </Anchor>
              <Text size="md">
                Don't have an account?{' '}
                <Anchor className="ml-2" component={Link} to="/signup">
                  Sign Up
                </Anchor>
              </Text>
            </div>
            {mutation.isError && (
              <Notification onClose={() => mutation.reset()} icon={<Cross1Icon />} color="red">
                {JSON.stringify(mutation.error.response.data.message)}
              </Notification>
            )}
            <Group className="flex justify-center">
              <Button onClick={submitHanlder} color="blue" className="mt-5" loading={mutation.isLoading}>
                Recover
              </Button>
            </Group>
          </div>
        )}
      </Card>
    </div>
  );
};

export { RecoverPassword };
