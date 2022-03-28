import { Card, Avatar, Text, Divider, Title, Button, Checkbox, Modal, Group, TextInput, ScrollArea, Textarea, Select, Loader } from '@mantine/core';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import endPoints from 'services/api';

const ConnectCard = ({ user }) => {
  const { role } = user;
  const { firstName, lastName, bio, location } = user.userInfo;
  return (
    <>
      <Card className="w-full flex my-4" shadow="sm" padding="lg">
        <Group className="w-20 mr-5">
          <Avatar size={45} radius="xl" src={`https://ui-avatars.com/api/?name=${firstName} ${lastName}`} />
        </Group>
        <Group className="w-2/3 flex flex-col items-start">
          <Text>{`${firstName} ${lastName}`}</Text>
        </Group>
      </Card>
    </>
  );
};
export default function Profile() {
  const [opened, setOpened] = useState(false);
  const options = {
    headers: {
      api: 123,
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  const {
    isLoading,
    data: userData,
    isError,
    error,
    refetch,
  } = useQuery('userinfo', async () => {
    axios.defaults.headers.api = `123`;
    axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    const { data } = await axios.get(endPoints.base + '/userinfo');
    return data;
  });

  const mutation = useMutation((newUser) => {
    axios.defaults.headers.api = `123`;
    axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return axios.patch(endPoints.base + '/users', newUser);
  });

  const emailRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const usernameRef = useRef(null);
  const locationRef = useRef(null);
  const availabiiltyRef = useRef(null);
  const bioRef = useRef(null);
  const specialtyRef = useRef(null);

  function ConnectionList(user) {
    const connections = user.connections;
    const cards = connections.map((connection) => <ConnectCard key={connection.id} user={connection} />);
    return { cards };
  }

  async function updateProfile() {
    const data = {
      email: emailRef.current.value,
      userInfo: {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        location: locationRef.current.value,
        bio: bioRef.current.value,
        specialty: specialtyRef.current.value,
      },
    };
    mutation.mutate(data, {
      onSuccess: () => {
        refetch();
      },
    });
  }
  const submitHanlder = async (event) => {
    event.preventDefault();
    updateProfile();
    setOpened(false);
  };

  let specialtyOptions = [
    { value: 'ADHD', label: 'ADHD' },
    { value: 'PTSD', label: 'PTSD' },
    { value: 'Substance Abuse', label: 'Substance Abuse' },
    { value: 'Biopolar Disorder', label: 'Biopolar Disorder' },
    { value: 'Stress', label: 'Stress' },
    { value: 'Anxiety', label: 'Anxiety' },
  ];
  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  return (
    <div>
      {isError && <p>{JSON.stringify(error)}</p>}
      {userData && (
        <div className="w-full max-h-fit mt-12 divide-x-2 flex flex-col lg:flex-row">
          <Modal opened={opened} onClose={() => setOpened(false)}>
            <Title align="center">Update your Information</Title>
            <ScrollArea className="mt-10" offsetScrollbars type="always" style={{ height: 300 }}>
              <TextInput ref={emailRef} type="email" defaultValue={userData.user.email ?? ''} placeholder="Email" label="Email" required />
              <Group>
                <TextInput ref={firstNameRef} placeholder="First Name" defaultValue={userData.user.userInfo.firstName ?? ''} label="First Name" required />
                <TextInput ref={lastNameRef} placeholder="Last Name" defaultValue={userData.user.userInfo.lastName ?? ''} label="Last Name" required />
              </Group>
              <TextInput ref={locationRef} placeholder="Location" defaultValue={userData.user.userInfo.location ?? ''} label="Location" required />
              <Select ref={specialtyRef} data={specialtyOptions} defaultValue={userData.user.userInfo.specialty ?? ''} placeholder="Specialty" label="Specialty" required />
              <Textarea ref={bioRef} placeholder="Biography" defaultValue={userData.user.userInfo.bio ?? ''} label="Biography" required />
            </ScrollArea>
            <Group sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button loading={mutation.isLoading} onClick={submitHanlder} color="blue" style={{ marginTop: 14 }}>
                Update
              </Button>
            </Group>
          </Modal>

          <div className="border w-1/3 justify-center hidden md:flex lg:flex mt-10">
          <div className="w-full flex">
      <div className="hidden md:block md:w-1/3">
        <Group></Group>
      </div>
      <ScrollArea style={{ height: '85vh' }} className="w-full md:w-2/3">
      <Title>Connections</Title>
        {connectData && connectData.map((item) => <ConnectCard key={item.id} user={item} />)}   
      </ScrollArea>
    </div>
          </div>

          <div className="order-first lg:order-2 md:ml-3 md:w-5/6 w-full px-10 md:mx-10">
            <div className="flex justify-between w-full md:w-full mb-5">
              <Title>Profile</Title>
              <Button onClick={() => setOpened((o) => !o)}>Edit</Button>
            </div>
            <div className=" self-center w-5/6 md:w-full h-2/3 space-y-4 mx-10">
              <Divider className="mb-5" />
              <Text className="flex justify-between">
                <Title className="inline-block mr-2" order={4}>
                  Email:
                </Title>
                {userData?.user.email ?? ''}
              </Text>
              <Text className="flex justify-between">
                <Title className="inline-block mr-2" order={4}>
                  Role:
                </Title>
                {userData?.user.role ?? ''}
              </Text>

              <Text className="flex justify-between">
                <Title className="inline-block mr-2" order={4}>
                  First Name:
                </Title>
                {userData.user.userInfo.firstName ?? ''}
              </Text>
              <Text className="flex justify-between">
                <Title className="inline-block mr-2" order={4}>
                  Last Name:{' '}
                </Title>
                {userData.user.userInfo.lastName ?? ''}
              </Text>
              <Text className="flex justify-between">
                <Title className="inline-block mr-2" order={4}>
                  Location{' '}
                </Title>
                {userData.user.userInfo.location ?? ''}
              </Text>
              <Text className="flex justify-between">
                {' '}
                <Title className="inline-block mr-2" order={4}>
                  Bio{' '}
                </Title>
                {userData.user.userInfo.bio ?? ''}
              </Text>
              <Text className="flex justify-between">
                {' '}
                <Title className="inline-block mr-2" order={4}>
                  Specialty:{' '}
                </Title>
                {userData.user.userInfo.specialty ?? ''}
              </Text>
              <Text className="flex justify-between">
                {' '}
                <Title className="inline-block mr-2" order={4}>
                  Availability:{' '}
                </Title>
                {userData.user.userInfo.availability ? <Checkbox checked disabled /> : <Checkbox />}
              </Text>
            </div>
          </div>
          <div className="md:ml-3 lg:w-1/4 w-full mt-10">
            <div className="w-full flex flex-col justify-center items-center">
              <Title>Requests</Title>
              <div>
                {userData.connections &&
                  userData.connections
                    .filter((ele) => {
                      return ele.Connection.accepted === false;
                    })
                    .map((item) => <ConnectCard key={item.id} user={item} />)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
