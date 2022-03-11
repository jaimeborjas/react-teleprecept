import { Timeline, Text, Divider, Title, Button, Checkbox, Modal, Group, TextInput, ScrollArea, Textarea, Select, Loader } from '@mantine/core';
import { FaceIcon, GearIcon, ReaderIcon } from '@modulz/radix-icons';
import React, { useEffect, useState } from 'react';
import useFetch from 'hooks/useFetch';
import endPoints from 'services/api';
import { useForm } from '@mantine/form';


let specialtyOptions = [
  { value: 'ADHD', label: 'ADHD' },
  { value: 'PTSD', label: 'PTSD' },
  { value: 'Substance Abuse', label: 'Substance Abuse' },
  { value: 'Biopolar Disorder', label: 'Biopolar Disorder' },
  { value: 'Stress', label: 'Stress' },
  { value: 'Anxiety', label: 'Anxiety' },
];
export default function Profile() {
  // const [userData, setUserData] = useState();
  const [opened, setOpened] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [userData, setUserData] = useState({})
  const data = useFetch(endPoints.auth.profile);


  useEffect(()=>{

    setUserData({...data.userInfo, email: data.email})

  }, [])
  // if(!userData) return <div className="grid items-center"><Loader/></div>
  return (
    <div className="w-full max-h-fit mt-12 divide-x-2 flex flex-col md:flex-row">
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <Title align="center">Update your Information</Title>
        <ScrollArea className="mt-10" offsetScrollbars type="always" style={{ height: 300 }}>
          <TextInput type="email" defaultValue={userData.email ?? ''}  placeholder="Email" label="Email" required />
          <Group>
            <TextInput placeholder="First Name" label="First Name" required  />
            <TextInput  placeholder="Last Name" label="Last Name" required />
          </Group>
          <TextInput  placeholder="Location" label="Location" required />
          <Select data={specialtyOptions} placeholder="Specialty" label="Specialty" required />
          <Textarea  placeholder="Biography" label="Biography" required />
        </ScrollArea>
        <Group sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button type='submit' color="blue" style={{ marginTop: 14 }}>
            Update
          </Button>
        </Group>
      </Modal> 

      {/* Progress bar */}
      <div className="border w-1/3 justify-center hidden md:flex lg:flex mt-10">
        <Timeline active={1} bulletSize={24} lineWidth={2}>
          <Timeline.Item bullet={<FaceIcon />} title="New Profile">
            <Text color="dimmed" size="sm">
              You&apos;ve created new profile
            </Text>
            <div className="h-4"></div>
          </Timeline.Item>

          <Timeline.Item bullet={<ReaderIcon />} title="Update Information">
            <Text color="dimmed" size="sm">
              You&apos;ve update your profile information
            </Text>
            <div className="h-4"></div>
          </Timeline.Item>
          <Timeline.Item title="Unlock Connect" bullet={<GearIcon />} lineVariant="dashed">
            <Text color="dimmed" size="sm">
              Update information to unlock connect
            </Text>
            <div className="h-4"></div>
          </Timeline.Item>
        </Timeline>
      </div>

      {/* User Information div */}
      <div className="w-2/3 ">
        <div className="flex justify-between w-4/5 mb-5">
          <Title>Profile</Title>
          <Button onClick={() => setOpened((o) => !o)}>Edit</Button>
        </div>
        <div className="w-2/4 h-2/3 space-y-4 ">
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
            {userData.firstName ?? ''}
          </Text>
          <Text className="flex justify-between">
            <Title className="inline-block mr-2" order={4}>
              Last Name:{' '}
            </Title>
            {userData.lastName ?? ''}
          </Text>
          <Text className="flex justify-between">
            <Title className="inline-block mr-2" order={4}>
              Location{' '}
            </Title>
            {userData.location ?? ''}
          </Text>
          <Text className="flex justify-between">
            {' '}
            <Title className="inline-block mr-2" order={4}>
              Bio{' '}
            </Title>
            {userData.bio ?? ''}
          </Text>
          <Text className="flex justify-between">
            {' '}
            <Title className="inline-block mr-2" order={4}>
              Specialty:{' '}
            </Title>
            {userData.specialty ?? ''}
          </Text>
          <Text className="flex justify-between">
            {' '}
            <Title className="inline-block mr-2" order={4}>
              Avilability:{' '}
            </Title>
            {/* {userData.availability ? <Checkbox checked disabled /> : <Checkbox />} */}
          </Text>
        </div>
      </div>
    </div>
  );
}
