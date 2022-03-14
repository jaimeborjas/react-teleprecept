import { Image, Title, Text, Divider, Button, Tabs } from '@mantine/core';
import nurse from '../img/nurse.svg';
// import curve from '../img/wave-haikei.svg';
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="w-full">
      <div className="w-full flex mt-20 ">
        <div className="w-2/3 flex flex-col pt-10 pl-28">
          <div className="mb-10">
            <Title className="text-6xl">
              Teleprecept <Text className="text-6xl inline text-blue-600">Match</Text>
            </Title>
          </div>
          <div>
            <Text className="text-3xl mb-16">Easily and Effortlessly Connect With Local Preceptors for Clinical Rotations !</Text>
            <Button component={Link} to="/signup" size="xl">
              Create account
            </Button>
          </div>
          <div className="mt-16">
            <Text className="text-xl mb-16">*A nurse-led project</Text>
          </div>
        </div>

        <div className="w-2/3 flex justify-center items center">
          <Image className="" src={nurse} />
        </div>
      </div>
      <div className="w-full absolute top-0 left-0 overflow-hidden  fill-blue-600">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>
      <div className="flex item-center">
        <Tabs>
          <Tabs.Tab label="Preceptors">These are the benefits</Tabs.Tab>
          <Tabs.Tab label="Students">These are the benefits</Tabs.Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Home;
