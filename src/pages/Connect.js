import { Card, Group, Loader, Text, Avatar, Divider, Button, Title, ScrollArea } from '@mantine/core';
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import endPoints from 'services/api';

const UserCard = ({ user }) => {
  const { role } = user;
  const { firstName, lastName, bio, location } = user.userInfo;
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
        <Button className="w-1/4 self-end">Connect</Button>
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
  return (
    <div className="w-full flex">
      <div className="hidden md:block md:w-1/3">
        <Group className="p-10">
          <Title order={4}>Filters</Title>
        </Group>
        <Group></Group>
      </div>
      <ScrollArea style={{ height: '85vh' }} className="w-full md:w-2/3">
        {data && data.map((item) => <UserCard key={item.id} user={item} />)}
      </ScrollArea>
    </div>
  );
};

export default Connect;
