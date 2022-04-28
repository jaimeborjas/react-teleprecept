import { Card, Avatar, Text, Divider, Title, Button, Checkbox, Modal, Group, TextInput, ScrollArea, Textarea, Select, Loader } from '@mantine/core';
import UploadFile from 'components/forms/UploadFile.js';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import endPoints from 'services/api';

const ConnectCard = ({ userId, user, handleAccept }) => {
  const { accepted, id: connectionId, userId: requestId } = user.Connection;
  const { role, username } = user;
  const { firstName, lastName } = user.userInfo;
  const { id } = user.Connection;
  const [isDeleted, setIsDeleted] = useState(false);
  const deleteMutation = useMutation((newUser) => {
    axios.defaults.headers.api = `123`;
    axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return axios.post(endPoints.base + '/users/connect/delete', newUser);
  });
  const handleDelete = () => {
    const data = {
      connectionId: id,
    };
    deleteMutation.mutate(data, {
      onSuccess: () => {
        setIsDeleted(true);
      },
    });
  };
  if (isDeleted)
    return (
      <Card className="w-full my-7 flex" shadow="md" padding="lg">
        <Text>You have deleted a connection with @{username}</Text>
      </Card>
    );
  return (
    <>
      <Card className="w-full flex my-4" shadow="sm" padding="lg">
        <Group className="w-20 mr-5">
          <Avatar size={45} radius="xl" src={`https://ui-avatars.com/api/?name=${username}`} />
        </Group>
        <Group className="w-2/3 flex flex-col items-start">
          <Text>{`${username}`}</Text>
          <Text>{`Role: ${role}`}</Text>
          {accepted === true || userId === requestId ? <div></div> : <Button onClick={() => handleAccept(connectionId)}>Accept</Button>}
          <Button variant="outline" color="red" onClick={() => handleDelete()}>
            Delete
          </Button>
        </Group>
      </Card>
    </>
  );
};
export default function Profile() {
  const [opened, setOpened] = useState(false);
  const [specVal, setSpecVal] = useState('');
  const [newSpec, setNewSpec] = useState('');

  let specialties;

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

  const mutation1 = useMutation((newUser) => {
    axios.defaults.headers.api = `123`;
    axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return axios.post(endPoints.base + '/users/connect/accept', newUser);
  });
  const handleAccept = (connectionId) => {
    const data = {
      connectionId: connectionId,
      accepted: true,
    };
    mutation1.mutate(data, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  const emailRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const locationRef = useRef(null);
  const bioRef = useRef(null);
  const specialtyRef = useRef(null);

  async function updateProfile() {
    const data = {
      email: emailRef.current.value,
      userInfo: {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        location: locationRef.current.value,
        bio: bioRef.current.value,
        specialty: specialtyRef.current.value === 'Other' ? newSpec : specialtyRef.current.value,
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

  const customSpec = () => {
    if (specVal === 'Other') {
      return (
        <TextInput
          placeholder="Your Specialty"
          label="Please Specify"
          value={newSpec}
          onChange={(event) => {
            setNewSpec(event.currentTarget.value);
          }}
          required
        />
      );
    }
  };

  let specialtyOptions = [
    { value: 'Attention Deficit Hyperactivity Disorder (ADHD)', label: 'Attention Deficit Hyperactivity Disorder (ADHD)' },
    { value: 'Anger Issues', label: 'Anger Issues' },
    { value: 'Anxiety', label: 'Anxiety' },
    { value: 'Autism Spectrum Disorders', label: 'Autism Spectrum Disorders' },
    { value: 'Bipolar Disorder', label: 'Bipolar Disorder' },
    { value: 'Depression', label: 'Depression' },
    { value: 'Eye Movement Desensitization and Reprocessing (EMDR)', label: 'Eye Movement Desensitization and Reprocessing (EMDR)' },
    { value: 'Family Caregiving Stress', label: 'Family Caregiving Stress' },
    { value: 'Gender Issues', label: 'Gender Issues' },
    { value: 'Insomnia', label: 'Insomnia' },
    { value: 'Job Stress', label: 'Job Stress' },
    { value: 'Medication Management', label: 'Medication Management' },
    { value: 'Obsessive Compulsive Disorder (OCD)', label: 'Obsessive Compulsive Disorder (OCD)' },
    { value: 'Post Traumatic Stress Disorder (PTSD)', label: 'Post Traumatic Stress Disorder (PTSD)' },
    { value: 'Psychosis and Schizophrenia Spectrum Disorders', label: 'Psychosis and Schizophrenia Spectrum Disorders' },
    { value: 'Stress', label: 'Stress' },
    { value: 'Substance Abuse', label: 'Substance Abuse' },
    { value: 'Suicidal Thoughts', label: 'Suicidal Thoughts' },
    { value: 'Therapy', label: 'Therapy' },
    { value: 'Trauma', label: 'Trauma' },
    { value: 'Other', label: 'Other' },
  ];
  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );

  if (userData) {
    const specList = userData.user.userInfo.specialty;
    specialties = specList.split(',');
    console.log(specialties);
  }
  return (
    <div className="p-2 md:pd-5">
      {isError && <p>{JSON.stringify(error)}</p>}
      {userData && (
        <div className="w-full max-h-fit mt-12 divide-x-2 flex flex-col md:flex-row">
          <Modal opened={opened} onClose={() => setOpened(false)}>
            <Title align="center" className="text-2xl">
              Update Your Information
            </Title>
            <ScrollArea className="mt-10" offsetScrollbars type="always" style={{ height: 300 }}>
              <TextInput ref={emailRef} type="email" defaultValue={userData.user.email ?? ''} placeholder="Email" label="Email" disabled />
              <Group>
                <TextInput ref={firstNameRef} placeholder="First Name" defaultValue={userData.user.userInfo.firstName ?? ''} label="First Name" disabled />
                <TextInput ref={lastNameRef} placeholder="Last Name" defaultValue={userData.user.userInfo.lastName ?? ''} label="Last Name" disabled />
              </Group>
              <TextInput ref={locationRef} placeholder="Location" defaultValue={userData.user.userInfo.location ?? ''} label="Location" required />
              <Select
                ref={specialtyRef}
                data={specialtyOptions}
                defaultValue={userData.user.userInfo.specialty ?? ''}
                value={specVal}
                onChange={setSpecVal}
                placeholder="Specialty"
                label="Specialty"
                required
              />
              {customSpec()}
              <Textarea ref={bioRef} placeholder="Biography" defaultValue={userData.user.userInfo.bio ?? ''} label="Biography" required />
            </ScrollArea>
            <Group sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button loading={mutation.isLoading} onClick={submitHanlder} color="teal" style={{ marginTop: 14 }}>
                Update
              </Button>
            </Group>
          </Modal>

          <div className="md:ml-3 md:w-1/3 lg:w-1/6 w-full">
            <div className="w-full flex flex-col justify-center items-center">
              <Title className="text-2xl">Connections</Title>
              {userData.connections && userData.connections.filter((ele) => ele.Connection.accepted === true).lenght === 0
                ? "you don't have any connections"
                : userData.connections.filter((ele) => ele.Connection.accepted === true).map((item) => <ConnectCard isConnected={true} key={item.id} user={item} />)}
            </div>
          </div>

          <div className="order-first lg:order-2 md:w-1/3 lg:w-4/6 w-full px-12">
            <div className="flex justify-between w-full md:w-full mb-5">
              <Title>Profile</Title>
              <Button color="teal" onClick={() => setOpened((o) => !o)}>Edit</Button>
            </div>
            <div className=" self-center w-5/6 md:w-full h-2/3 space-y-4">
              <Divider className="mb-5" />
              <Text className="flex justify-between">
                <Title className="inline-block mr-2" order={4}>
                  Email:
                </Title>
                {userData?.user.email ?? ''}
              </Text>
              <Text className="flex justify-between">
                <Title className="inline-block mr-2" order={4}>
                  Username:
                </Title>
                {userData?.user.username ?? ''}
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
                  Location:{' '}
                </Title>
                {userData.user.userInfo.location ?? ''}
              </Text>
              <Text className="flex justify-between">
                {' '}
                <Title className="inline-block mr-2" order={4}>
                  About Me:{' '}
                </Title>
                {userData.user.userInfo.bio ?? ''}
              </Text>
              <Text className="flex justify-between">
                {' '}
                <Title className="inline-block mr-2" order={4}>
                  Specialty:{' '}
                </Title>
                {userData.user.userInfo.specialty
                  ? specialties.map((element) => {
                      {
                        return <Text>{element}</Text>;
                      }
                    })
                  : ''}
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
          <div className="md:w-1/3 lg:w-1/6 w-full ml-5">
            <div className="w-full flex flex-col justify-center items-center">
              <Title className="text-2xl">Requests</Title>
              {userData.connections && userData.connections.filter((ele) => ele.Connection.accepted === false).length === 0 ? (
                <Text>You don't have any requests</Text>
              ) : (
                userData.connections
                  .filter((ele) => {
                    return ele.Connection.accepted === false;
                  })
                  .map((item) => <ConnectCard userId={userData.user.id} handleAccept={handleAccept} isConnected={false} key={item.id} user={item} />)
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
