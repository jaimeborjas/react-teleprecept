import React, { useState } from 'react';
import axios from 'axios';
import { Card, Text, Avatar, Modal, Title, ScrollArea } from '@mantine/core';
import { StarIcon, HomeIcon, ClockIcon, InfoCircledIcon, PlusCircledIcon, EnterIcon } from '@modulz/radix-icons';
import { useMutation } from 'react-query';
import endPoints from 'services/api';

const UserCard = ({ user }) => {
  const mutation = useMutation((newUser) => {
    axios.defaults.headers.api = `123`;
    axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return axios.post(endPoints.base + '/users/connect', newUser);
  });
  const [isConnected, setIsConnected] = useState(false);
  const [opened, setOpened] = useState(false);
  //const [opened, setOpened] = useState(false);
  const { id, username } = user;
  const { specialty, bio, location } = user.userInfo;

  const ViewProfile = () => {
    return (
      <div>
        <Modal opened={opened} onClose={() => setOpened(false)} size="xl">
          <Title align="center" className="text-2xl">
            @{username}
          </Title>
          <ScrollArea className="mt-7 ml-5 pb-5" offsetScrollbars type="always" style={{ height: 300 }}>
            <Title className="text-lg">Specialties</Title>
            <div className="w-full min-h-full bg-blue-200">
              <Text className="p-2">{specialty}</Text>
            </div>
            <Title className="text-lg mt-3">Location</Title>
            <div className="w-full min-h-full bg-blue-200">
              <Text className="p-2">{location}</Text>
            </div>
            <Title className="text-lg mt-3">Preceptorship Type</Title>
            <div className="w-full min-h-full bg-blue-200">
              <Text className="p-2">In-person</Text>
            </div>
            <Title className="text-lg mt-3">Test Score</Title>
            <div className="w-full min-h-full bg-blue-200">
              <Text className="p-2">{user.score ? user.score : '--/100'}</Text>
            </div>
            <Title className="text-lg mt-3">Certifications</Title>
            <div className="w-full min-h-full bg-blue-200">
              <Text className="p-2">No certifications</Text>
            </div>
            <Title className="text-lg mt-3">About Me</Title>
            <div className="w-full min-h-full bg-blue-200">
              <Text className="p-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tristique volutpat diam nec ornare. Morbi finibus libero arcu, in congue ex tincidunt vel. Ut scelerisque finibus
                laoreet. Curabitur a nisl aliquam, venenatis lacus nec, facilisis nunc. Aenean id pellentesque orci. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
                turpis egestas. Sed pharetra scelerisque dui, ac elementum metus vestibulum vitae. Proin a sem euismod, eleifend metus sagittis, varius leo nam.
              </Text>
            </div>
          </ScrollArea>
        </Modal>
      </div>
    );
  };

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
        <Text>You have requested a connection with @{username}</Text>
      </Card>
    );
  return (
    <div className="relative mb-10 shadow-lg md:m-5 w-96 hover:scale-[1.01] transition ease-in-out delay-150 rounded-md">
      <div className="flex justify-end h-14 bg-blue-500  mb-12 rounded-md">
        <ViewProfile />
        <span className="drop-shadow-lg">
          <EnterIcon onClick={() => setOpened((e) => !e)} className="scale-[2] m-5 drop-shadow-lg hover:scale-[2.3] transition ease-in-out cursor-pointer delay-150" color="white" size="50" />
        </span>
        <span className="drop-shadow-lg ">
          <PlusCircledIcon onClick={handleConnect} className="scale-[2] m-5 drop-shadow-lg hover:scale-[2.3] transition ease-in-out cursor-pointer delay-150" color="white" size="50" />
        </span>
      </div>
      <div className="flex absolute w-24 h-24 left-10 top-6 rounded-full bg-white">
        <div className="flex items-center justify-center m-auto text-center w-20 h-20 rounded-full bg-blue-500 text-white text-lg shadow-lg">
          <Avatar size={45} radius="xl" src={`https://ui-avatars.com/api/?name=${username}&font-size=0.45&background=4A82EE&color=fff`} />
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
  );
};

export default UserCard;
