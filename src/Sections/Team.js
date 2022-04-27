import React from 'react';
import { Title, Text, Image } from '@mantine/core';
import smith from '../img/smith.jpeg';
import juola from '../img/juola.jpeg';
import grouppic from '../img/grouppic.png'

const Team = () => {
  return (
    <div className="w-full">
      <div className="mt-6">
        <Title className="text-center #6ee7b7 pt-20">Meet Our Team</Title>
      </div>
      <div className="flex mt-12 flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row items-center">
        <div className="basis-1/3">
          <div className="flex justify-center">
            <Image src={smith} radius="md" className="w-48" />
          </div>
          <Title className="text-xl text text-center mt-4">Dr. Marie Smith, PhD</Title>
          <Text className="text-lg text text-center pr-5 pl-5">
            Clinical Assistant Professor <br />
            Director, Psychiatric-Mental Health Nurse Practitioner Program School of Nursing
          </Text>
        </div>
        <div className="basis-1/3">
          <div className="flex justify-center">
            <Image src={grouppic} radius="md" className="w-72" />
          </div>
          <Title className="text-xl text text-center mt-4">Development Team</Title>
          <Text className="text-lg text text-center pr-5 pl-5">
            Duquesne 2022 Senior Computer Science Capstone Project <br />
          </Text>
        </div>
        <div className="basis-1/3">
          <div className="flex justify-center">
            <Image src={juola} radius="md" className="w-48" />
          </div>
          <Title className="text-xl text text-center mt-4">Dr. Patrick Juola, PhD</Title>
          <Text className="text-lg text text-center pr-5 pl-5">
            Professor of Computer Science, Cybersecurity Studies <br />
            Coordinator, Joseph A. Lauritis, C.S.Sp. Endowed Chair in Teaching and Technology
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Team;
