import { Title, Text, Tabs } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';
import book from 'img/book.png';
import money from 'img/money.png';
import certificate from 'img/certificate.png';
import computer from 'img/computer.png';
import clock from 'img/clock.png';
import secure from 'img/secure.png';

function Benefits() {
  return (
    <div className="w-full mt-6">
      <div className="mt-6">
        <Title className="text-center #6ee7b7">Benefits</Title>
      </div>
      <div className="justify-center sm:flexflex  item-center mt-6 ">
        <Tabs grow position="center">
          <Tabs.Tab className="title text-lg ml-50 text-teal-300" label="Students">
            <div className="flex w-full px-30 text-center">
              <div className="w-1/4 flex flex-col justify-center items-center p-10 space-x-3 pt-100 ">
                <img src={money} width="w-16" alt="logo" />
                <Text className="pt-10 text-sm sm:text-md md:text-lg lg:text-lg xl:text-lg 2xl:text-lg  text-center ">Affordable Student-Preceptor Matching Service</Text>
              </div>
              <div className="w-1/4 flex flex-col justify-center items-center p-10 space-x-3">
                <img src={computer} width="75px" alt="logo" />
                <Text className="pt-10 text-sm sm:text-md md:text-lg lg:text-lg xl:text-lg 2xl:text-lg  text-center">Complete Preceptorship Virtually or In-Person</Text>
              </div>
              <div className="w-1/4 flex flex-col justify-center items-center p-10 space-x-3">
                <img src={certificate} width="75px" alt="logo" />
                <Text className="pt-10 text-sm sm:text-md md:text-lg lg:text-lg xl:text-lg 2xl:text-lg  text-center">Certification of Completion Awarded</Text>
              </div>
              <div className="w-1/4 flex flex-col justify-center items-center p-10 space-x-3">
                <img src={secure} width="75px" alt="logo" />
                <Text className="pt-10 text-sm sm:text-md md:text-lg lg:text-lg xl:text-lg 2xl:text-lg  text-center">HIPAA, GDPR and PHIPA/PIPEDA Compliant </Text>
              </div>
            </div>
          </Tabs.Tab>

          <Tabs.Tab className="title text-lg text-teal-300" label="Preceptors">
            <div className="flex w-full px-30 text-center">
              <div className="w-1/4 flex flex-col justify-center items-center p-10">
                <img src={money} width="75px" alt="logo" />
                <p className=" px-10 text-sm sm:text-md md:text-lg lg:text-lg xl:text-lg 2xl:text-lg ">Monetary Compensation</p>
              </div>
              <div className="w-1/4 flex flex-col justify-center items-center p-10">
                <img src={book} width="75px" alt="logo" />
                <p className=" px-10 text-sm sm:text-md md:text-lg lg:text-lg xl:text-lg 2xl:text-lg ">Access to Campus Library</p>
              </div>
              <div className="w-1/4 flex flex-col justify-center items-center p-10">
                <img src={clock} width="75px" alt="logo" />
                <p className=" px-10 text-sm sm:text-md md:text-lg lg:text-lg xl:text-lg 2xl:text-lg ">Preceptor Hours Credited</p>
              </div>
              <div className="w-1/4 flex flex-col justify-center items-center p-10">
                <img src={secure} width="75px" alt="logo" />
                <p className=" px-10 text-sm sm:text-md md:text-lg lg:text-lg xl:text-lg 2xl:text-lg ">HIPAA, GDPR and PHIPA/PIPEDA Compliant</p>
              </div>
            </div>
          </Tabs.Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Benefits;
