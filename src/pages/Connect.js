import { MultiSelect, Grid, Loader, Text, Title, TextInput } from '@mantine/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import endPoints from 'services/api';
import UserCard from 'components/UserCard';

const FilterBar = ({ onLocationFilter, OnSpecialityFilter }) => {
  const [filters, setFilters] = useState({
    location: '',
    speciality: '',
  });

  const handleInput = (field) => (event) => {
    const { value } = event.target;

    setFilters({
      ...filters,
      [field]: value,
    });
    switch (field) {
      case 'location':
        onLocationFilter(value);
        break;
      case 'specialty':
        OnSpecialityFilter(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="hidden md:block md:w-1/3">
      <div className="p-10">
        <Title order={2}>Filters</Title>
      </div>
      <form>
        <Grid className="p-10">
          <Grid.Col span={12}>
            <TextInput placeholder="Location" label="Location" value={filters.location} onChange={handleInput('location')} />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput placeholder="Speciality" label="Speciality" value={filters.specialty} onChange={handleInput('specialty')} />
          </Grid.Col>

          <Grid.Col span={12}>
            <button type="submit" className="border-0 outline-0 bg-teal-300 rounded-lg hover:bg-sky-500 transition duration-300 cursor-pointer">
              <p className="text-lg p-2 m-0 text-white">Reset</p>
            </button>
          </Grid.Col>
        </Grid>
      </form>
    </div>
  );
};

const Connect = () => {
  const { isLoading, data } = useQuery('users', async () => {
    axios.defaults.headers.api = `123`;
    axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    const { data } = await axios.get(endPoints.base + '/users/available');
    return data;
  });
  const [allData, setData] = useState(data);
  useEffect(() => {
    setData(data);
  }, [data]);

  const handleFilterLocation = (location) => {
    const filteredData = data.filter((item) => {
      if (item.userInfo.location.toLowerCase().includes(location.toLowerCase())) {
        return item;
      } else if (item === '') {
        return data;
      }
      return false;
    });
    setData(filteredData);
  };

  const handleFilterSpeciality = (specialty) => {
    const filteredData = allData.filter((item) => {
      if (item.userInfo.specialty.toLowerCase().includes(specialty.toLowerCase())) {
        return item;
      }
      return false;
    });
    setData(filteredData);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  return (
    <div className="w-full p-12 flex justify-left">
      <FilterBar onLocationFilter={handleFilterLocation} OnSpecialityFilter={handleFilterSpeciality} />
      <div className="w-full md:w-2/3">
        <Title className="" align="center">
          Connect with others:
        </Title>
        {data &&
          data.length === 0 &&
          allData &&
          allData.length ===
            0(
              <Text className="mt-5 text-lg" align="center">
                There are not available people to connect
              </Text>
            )}
        {allData && allData.length === 0 && (
          <Text className="mt-5 text-lg" align="center">
            There are not available people to connect
          </Text>
        )}
        <div className="w-full gap-7 grid grid-cols-1 lg:grid-cols-2 justify-start">{allData && allData.length > 0 && allData.map((item) => <UserCard key={item.id} user={item} />)}</div>
      </div>
    </div>
  );
};

export default Connect;
