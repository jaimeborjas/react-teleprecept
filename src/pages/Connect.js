import { Card, Group, Loader, Text, Avatar, Divider, Button, Title, ScrollArea } from '@mantine/core';
import axios from 'axios';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import endPoints from 'services/api';

const UserCard = ({ user }) => {
  const mutation = useMutation((newUser) => {
    axios.defaults.headers.api = `123`;
    axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return axios.post(endPoints.base + '/users/connect', newUser);
  });
  const [isConnected, setIsConnected] = useState(false);
  const { id, role } = user;
  const { firstName, lastName, bio, location } = user.userInfo;
  const handleConnect = () => {
    const data = {
      connectionId: id,
    };
    mutation.mutate(data, {
      onSuccess: () => {
        setIsConnected(true);
      },
    });
  };
  if (isConnected)
    return (
      <Card className="w-full my-7 flex" shadow="md" padding="lg">
        <Text>You have connected with {firstName + ' ' + lastName}</Text>
      </Card>
    );
  return (
    <>
      <Card className="w-full my-7 flex" shadow="md" padding="lg">
        <Group className="w-20 mr-5">
          <Avatar size={60} radius="xl" src={`https://ui-avatars.com/api/?name=${firstName} ${lastName}`} />
        </Group>
        <Group className="w-2/3 flex flex-col items-start">
          <Text>{`${firstName} ${lastName}`}</Text>
          <Text>{`Role: ${role ? role : ''} `}</Text>
          <Text>{`Location: ${location ? location : ''}`}</Text>
          <Divider />
          <Text>{`Biography: ${bio ? bio : ''}`}</Text>
        </Group>
        <Button loading={mutation.isLoading} onClick={handleConnect} className="w-1/4 self-end">
          Connect
        </Button>
      </Card>
    </>
  );
};
const Connect = () => {
  const { isLoading, data } = useQuery('users', async () => {
    axios.defaults.headers.api = `123`;
    axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    const { data } = await axios.get(endPoints.base + '/users');
    return data;
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  console.log(data);
  return (
    <div className="w-full flex justify-center">
      {/* <div className="hidden md:block md:w-1/3">
        <Group className="p-10">
          <Title order={4}>Filters</Title>
        </Group>
        <Group></Group>
      </div> */}

      <ScrollArea style={{ height: '85vh' }} className="w-2/3 md:w-2/3 mt-10">
        <Title align="center">People to connect:</Title>
        {data && data.map((item) => <UserCard key={item.id} user={item} />)}
      </ScrollArea>
    </div>
  );
};

export default Connect;
