import React from 'react';
import { Title, Button, Text } from '@mantine/core';

const Mission = () => {
  return (
    <div className="flex justify-center items-center mt-16 mb-10 w-full h-96 bg-blue-700">
      <Title className="text-3xl text-center text-white">
        <Text className="mission-text inline text-3xl text-cyan-200">Teleprecept-Match</Text> is dedicated to making Preceptorships <br /> easy and accessible for all students and preceptors.
      </Title>
    </div>
  );
};

export default Mission;
