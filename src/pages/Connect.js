import { Card, Group, Loader, Text, Avatar, Divider, Button, Title, ScrollArea } from '@mantine/core';
import axios from 'axios';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import endPoints from 'services/api';
import { StarIcon, HomeIcon, ClockIcon, InfoCircledIcon, PlusCircledIcon } from '@modulz/radix-icons';

const UserCard = ({ user }) => {
  const mutation = useMutation((newUser) => {
    axios.defaults.headers.api = `123`;
    axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return axios.post(endPoints.base + '/users/connect', newUser);
  });
  const [isConnected, setIsConnected] = useState(false);
  const { id, username, role } = user;
  const { firstName, lastName, specialty, bio, location } = user.userInfo;
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
    <div className="relative mb-10 shadow-lg md:m-5 w-96">
      <div className="flex justify-end h-14 bg-blue-500  mb-12">
        <span className="drop-shadow-lg">
          <PlusCircledIcon className="scale-[2] m-5 drop-shadow-lg" color="white" size="50" />
        </span>
      </div>
      <div className="flex absolute w-24 h-24 left-10 top-6 rounded-full bg-white">
        <div className="flex items-center justify-center m-auto text-center w-20 h-20 rounded-full bg-blue-500 text-white text-lg shadow-lg">
          <p>DD</p>
        </div>
      </div>
      <p className="absolute top-11 left-36 hidden xs:block truncate">@{username}</p>
      <div className="h-1/2 bg-white">
        <div className="grid grid-flow-col gap-1 xs:gap-10 ml-8 mr-8">
          <ul className="flex flex-col justify-evenly list-none p-0">
            <li>
              <span className="pr-2">
                <StarIcon />
              </span>
              {specialty}
            </li>
            <li className="">
              <span className="pr-2">
                <HomeIcon />
              </span>
              {location}
            </li>
            <li>
              <span className="pr-2">
                <ClockIcon />
              </span>
              Availability
            </li>
          </ul>
          <p className="px-4">
            <span className="pr-2">
              <InfoCircledIcon />
            </span>
            {bio}
          </p>
        </div>
      </div>
    </div>
    // <>
    //   <Card className="w-full my-7 flex" shadow="md" padding="lg">
    //     <Group className="w-20 mr-5">
    //       <Avatar size={60} radius="xl" src={`https://ui-avatars.com/api/?name=${firstName} ${lastName}`} />
    //     </Group>
    //     <Group className="w-2/3 flex flex-col items-start">
    //       <Text>{`${firstName} ${lastName}`}</Text>
    //       <Text>{`Role: ${role ? role : ''} `}</Text>
    //       <Text>{`Location: ${location ? location : ''}`}</Text>
    //       <Divider />
    //       <Text>{`Biography: ${bio ? bio : ''}`}</Text>
    //     </Group>
    //     <Button loading={mutation.isLoading} onClick={handleConnect} className="w-1/4 self-end">
    //       Connect
    //     </Button>
    //   </Card>
    // </>
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
    <div className="w-full flex justify-center">
      {/* <div className="hidden md:block md:w-1/3">
        <Group className="p-10">
          <Title order={4}>Filters</Title>
        </Group>
        <Group></Group>
      </div> */}
      <div>
        <Title className="my-5" align="center">
          Connect with others:
        </Title>
        <div className="w-full gap-7 grid grid-cols-1 lg:grid-cols-2 justify-start">{data && data.map((item) => <UserCard key={item.id} user={item} />)}</div>
      </div>
    </div>
  );
};

export default Connect;
