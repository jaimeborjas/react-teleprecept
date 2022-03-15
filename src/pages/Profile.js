import { Card, Avatar, Timeline, Text, Divider, Title, Button, Checkbox, Modal, Group, TextInput, ScrollArea, Textarea, Select, Loader } from '@mantine/core';
import { FaceIcon, GearIcon, ReaderIcon } from '@modulz/radix-icons';
import React, { useEffect, useRef, useState } from 'react';
import useFetch from 'use-http';


const ConnectCard = ({ user }) => {
  const { role } = user;
  const { firstName, lastName, bio, location } = user.userInfo;
  return (
    <>
      <Card className="w-full my-7 flex" shadow="md" padding="lg">
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
  // @ts-ignore
  // const { data, loading, error } = useFetch(endPoints.auth.profile);
  const { get, patch, response, loading, error } = useFetch("https://teleprecept.herokuapp.com", options)

  const [userData, setUserData] = useState(null);
  const [connectData, setConnectData] = useState(null);
  const [allUsersData, setAllUsersrData] = useState(null);
  const [connectedUserData, setConnectedUserData] = useState(null);

  const emailRef = useRef(null);
  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const locationRef = useRef(null)
  const availabiiltyRef = useRef(null)
  const bioRef = useRef(null)
  const specialtyRef = useRef(null)
  
  useEffect(() => {
    async function loadInitialProfile() {
      const profile = await get('/userinfo')
      if(response.ok) setUserData(profile)
      setConnectData(profile.connections)
      const users = await get('/users')
      if(response.ok) setAllUsersrData(users)
      
    }
    loadInitialProfile()
  }, [response])

  async function updateProfile() {
    const data = {
      email: emailRef.current.value,
      userInfo: {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        location: locationRef.current.value,
        bio: bioRef.current.value,
        specialty: specialtyRef.current.value
      }
    }
    const update = await patch('/users', data)
    if(response.ok) setUserData(update)
  }
  const submitHanlder = async (event) => {
    event.preventDefault();
    updateProfile()
    setOpened(false)
  };
  
  let specialtyOptions = [
    { value: 'ADHD', label: 'ADHD' },
    { value: 'PTSD', label: 'PTSD' },
    { value: 'Substance Abuse', label: 'Substance Abuse' },
    { value: 'Biopolar Disorder', label: 'Biopolar Disorder' },
    { value: 'Stress', label: 'Stress' },
    { value: 'Anxiety', label: 'Anxiety' },
  ];
  return (
    <div>
      {loading && <div className="flex items-center justify-center"><Loader /></div>}
      {error && <p>{JSON.stringify(error)}</p>}
      {userData && (
        <div className="w-full max-h-fit mt-12 divide-x-2 flex flex-col md:flex-row">
          <Modal opened={opened} onClose={() => setOpened(false)}>
            <Title align="center">Update your Information</Title>
            <ScrollArea className="mt-10" offsetScrollbars type="always" style={{ height: 300 }}>
              <TextInput ref={emailRef} type="email" defaultValue={userData.email ?? ''} placeholder="Email" label="Email" required />
              <Group>
                <TextInput ref={firstNameRef} placeholder="First Name" defaultValue={userData.userInfo.firstName ?? ''} label="First Name" required />
                <TextInput ref={lastNameRef} placeholder="Last Name" defaultValue={userData.userInfo.lastName ?? ''} label="Last Name" required />
              </Group>
              <TextInput ref={locationRef} placeholder="Location" defaultValue={userData.userInfo.location ?? ''} label="Location" required />
              <Select ref={specialtyRef} data={specialtyOptions} defaultValue={userData.userInfo.specialty ?? ''} placeholder="Specialty" label="Specialty" required />
              <Textarea ref={bioRef} placeholder="Biography" defaultValue={userData.userInfo.bio ?? ''} label="Biography" required />
            </ScrollArea>
            <Group sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button onClick={submitHanlder} type="submit" color="blue" style={{ marginTop: 14 }}>
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
        {allUsersData && allUsersData.map((item) => <ConnectCard key={item.id} user={item} />)}
      </ScrollArea>
    </div>
          </div>


          <div className="md:ml-10 md:w-4/5 w-full ">
            <div className="flex justify-between w-5/6 md:w-4/5 mb-5 mx-10">
              <Title>Profile</Title>
              <Button onClick={() => setOpened((o) => !o)}>Edit</Button>
            </div>
            <div className=" self-center w-5/6 md:w-3/4 h-2/3 space-y-4 mx-10">
              <Divider className="mb-5" />
              <Text className="flex justify-between">
                <Title className="inline-block mr-2" order={4}>
                  Email:
                </Title>
                {userData?.email ?? ''}
              </Text>

              <Text className="flex justify-between">
                <Title className="inline-block mr-2" order={4}>
                  First Name:
                </Title>
                {userData.userInfo.firstName ?? ''}
              </Text>
              <Text className="flex justify-between">
                <Title className="inline-block mr-2" order={4}>
                  Last Name:{' '}
                </Title>
                {userData.userInfo.lastName ?? ''}
              </Text>
              <Text className="flex justify-between">
                <Title className="inline-block mr-2" order={4}>
                  Location{' '}
                </Title>
                {userData.userInfo.location ?? ''}
              </Text>
              <Text className="flex justify-between">
                {' '}
                <Title className="inline-block mr-2" order={4}>
                  Bio{' '}
                </Title>
                {userData.userInfo.bio ?? ''}
              </Text>
              <Text className="flex justify-between">
                {' '}
                <Title className="inline-block mr-2" order={4}>
                  Specialty:{' '}
                </Title>
                {userData.userInfo.specialty ?? ''}
              </Text>
              <Text className="flex justify-between">
                {' '}
                <Title className="inline-block mr-2" order={4}>
                  Avilability:{' '}
                </Title>
                {userData.userInfo.availability ? <Checkbox checked disabled /> : <Checkbox />}
              </Text>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
