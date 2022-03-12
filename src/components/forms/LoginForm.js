import { useEffect, useRef, useState } from 'react';
import { Modal, Button, Group, TextInput, createStyles, Anchor } from '@mantine/core';
import { Paper, Title, PasswordInput, Notification, Text } from '@mantine/core';
import { Cross1Icon, LockClosedIcon } from '@modulz/radix-icons';
import { useAuth } from 'hooks/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';

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
};

const LoginForm = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const auth = useAuth();
  
  const navigate = useNavigate();
  useEffect(() => {
    if(auth.user) navigate('/profile')
  })
 

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitHanlder = (event) => {
    event.preventDefault();
    setLoading(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    auth
      .signIn(email, password)
      .then(() => {
        setLoading(false)
        navigate('/profile', {replace: true})
      })
      .catch((err) => {
        setError('Error Login in try again')
        setLoading(false)
      });
  };

  return (
    <Paper>
      <Title align="center">Log In</Title>
      <TextInput ref={emailRef} placeholder="Email Address" label="Email Address" type="email" required />
      <PasswordInput ref={passwordRef} icon={<LockClosedIcon />} placeholder="Password" label="Password" required />
      <div className="mt-3  flex justify-center flex-col items-center">
        <Anchor className="mr-4">Forgot password</Anchor>
        <Text size="sm">Not an Account? <Anchor>Sign Up</Anchor></Text>
      </div>
      {error && <Notification onClose={()=>setError(null)} icon={<Cross1Icon />} color="red">{error}</Notification>}
      <Group className="flex justify-center">
        <Button onClick={submitHanlder} color="blue" className="mt-5" loading={loading}>
          Log In
        </Button>
      </Group>
    </Paper>
  );
};

export { LoginFormModal, LoginForm };
