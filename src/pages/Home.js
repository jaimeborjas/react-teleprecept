import { Image, Title, Text, Divider, Button, Tabs } from '@mantine/core';
import nurse from '../img/nurse.svg';
// import curve from '../img/wave-haikei.svg';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from 'img/logo.png';
import book from 'img/book.png';
import money from 'img/money.png';
import certificate from 'img/certificate.png';
import computer from 'img/computer.png';
import clock from 'img/clock.png';
import secure from 'img/secure.png';

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
            <Text className="text-3xl mb-16">Easily and Effortlessly Connect With Preceptors for Clinical Rotations !</Text>
            <Button component={Link} to="/signup" size="xl">
              Create account
            </Button>
          </div>
          <div className="mt-16">
            <Text className="text-xl mb-16">*A nurse-led project</Text>
          </div>
        </div>

        <div className="w-2/3 flex justify-center items center">
          <Image fit="cover" height={500} className="" src={nurse} />
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

      <h2 className="text-4xl flex justify-center items center">
        <Text className="text-4xl inline text-blue-600 px-2">Benefits </Text>Include
      </h2>

      <div className=" text-xl justify-center flex item-center">
        <Tabs grow position="center">
          <Tabs.Tab label="Students">
            <div className="flex w-full px-20 text-center">
              <div className="w-1/4 flex flex-col justify-center items-center p-10">
                <img src={money} width="75px" p-0 alt="logo" />
                <p className=""> Affordable Student-Preceptor Matching Service</p>
              </div>
              <div className="w-1/4 flex flex-col justify-center items-center p-10">
                <img src={computer} width="75px" p-0 alt="logo" />
                <p>Complete Preceptorship Virtually or In-Person</p>
              </div>
              <div className="w-1/4 flex flex-col justify-center items-center p-10">
                <img src={certificate} width="75px" p-0 alt="logo" />
                <p>Certification of Completion Awarded</p>
              </div>
              <div className="w-1/4 flex flex-col justify-center items-center p-10">
                <img src={secure} width="75px" p-0 alt="logo" />
                <p>HIPAA, GDPR and PHIPA/PIPEDA Compliant </p>
              </div>
            </div>
          </Tabs.Tab>

          <Tabs.Tab label="Preceptors">
            <div className="flex w-full px-20 text-center">
              <div className="w-1/4 flex flex-col justify-center items-center p-10">
                <img src={money} width="75px" p-0 alt="logo" />
                <p className=" px-10">Monetary Compensation</p>
              </div>
              <div className="w-1/4 flex flex-col justify-center items-center p-10">
                <img src={book} width="75px" p-0 alt="logo" />
                <p>Access to Campus Library</p>
              </div>
              <div className="w-1/4 flex flex-col justify-center items-center p-10">
                <img src={clock} width="75px" p-0 alt="logo" />
                <p>Preceptor Hours Credited </p>
              </div>
              <div className="w-1/4 flex flex-col justify-center items-center p-10">
                <img src={secure} width="75px" p-0 alt="logo" />
                <p>HIPAA, GDPR and PHIPA/PIPEDA Compliant </p>
              </div>
            </div>
          </Tabs.Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Home;
