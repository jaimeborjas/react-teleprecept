import React from 'react';
import { Title, Image, Text } from '@mantine/core';
import userIcon from '../img/user-icon.png';
import Stars from 'Sections/Stars';

function Review() {
  return (
    <div className="w-full mt-10 pl-30 pr-30 ">
      <Title className="text-center #6ee7b7">What Our Users Say</Title>
      <div className="h-40 mt-10 pl-10 pr-10 flex items-center  border-4 border-blue-700">
        <Image src={userIcon} className="w-24" />
        <div className="ml-6">
          <Title className="text-xl text font-semibold mb-2">Satisfied User</Title>
          <Stars />
          <Text className="text-sm sm:text-md md:text-lg lg:text-lg xl:text-lg 2xl:text-lg text mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut iaculis nisi. Vivamus sed tristique nisl. Maecenas velit diam, feugiat eu tempus finibus, laoreet vitae augue. In eu enim.
          </Text>
        </div>
      </div>
      <div className="h-40 mt-10 pl-10 pr-10 flex items-center border-4 border-blue-700">
        <Image src={userIcon} className="w-24" />
        <div className="ml-6">
          <Title className="text-xl text font-semibold mb-2">Satisfied User</Title>
          <Stars />
          <Text className="text-sm sm:text-md md:text-lg lg:text-lg xl:text-lg 2xl:text-lg text mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut iaculis nisi. Vivamus sed tristique nisl. Maecenas velit diam, feugiat eu tempus finibus, laoreet vitae augue. In eu enim.
          </Text>
        </div>
      </div>
      <div className="h-40 mt-10 pl-10 pr-10 flex items-center border-4 border-blue-700">
        <Image src={userIcon} className="w-24" />
        <div className="ml-6">
          <Title className="text-xl text font-semibold mb-2">Satisfied User</Title>
          <Stars />
          <Text className="text-sm sm:text-md md:text-lg lg:text-lg xl:text-lg 2xl:text-lg text mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut iaculis nisi. Vivamus sed tristique nisl. Maecenas velit diam, feugiat eu tempus finibus, laoreet vitae augue. In eu enim.
          </Text>
        </div>
      </div>
    </div>
  );
}

export default Review;
