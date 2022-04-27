import React from 'react';
import { Image, Title, Text, Divider, Button, Grid } from '@mantine/core';
import nurse from '../img/guynurse.png';
import { PlayButton } from '../img/AllSvg';
import '../css/style.css';
import { Link } from 'react-router-dom';

function Intro() {
  return (
    <div className="w-full">
      <div className="w-full flex mt-20 ">
        <div className="w-2/3 flex flex-col pt-10 pl-28">
          <div className="mb-10">
            <Title className="text-5xl title">Teleprecept-Match</Title>
          </div>
          <div>
            <Text className="text-xl mb-16 text">
              A nurse-led project for easy and secure connection with preceptors.
              <br />
              Teleprecept-Match is dedicated to making Preceptorship seamless and accessible to all students and preceptors.
            </Text>
            <Grid>
              <Grid.Col lg={3} md={4}>
                <Button className="button bg-[#6ee7b7] hover:bg-[#6ee7b7]" color="#6ee7b7" radius="xl" component={Link} to="/signup" size="xl">
                  Get Started
                </Button>
              </Grid.Col>
              <Grid.Col lg={3} md={4}>
                <a href="https://youtu.be/xBpShWGecDM" className=" flex p-5 opacity-70 hover:opacity-100 span">
                  <div>
                    <PlayButton />
                  </div>
                  <span className="text text-span"> Watch Video</span>
                </a>
              </Grid.Col>
            </Grid>
          </div>
        </div>

        <div className="w-2/3 flex justify-center">
          <Image className="nurse-image sm:w-3/4 md:w-2/3 lg:w-3/4 xl:w-4/5 2xl:w-full pt-20" src={nurse} alt="nurse" />
        </div>
      </div>
    </div>
  );
}

export default Intro;
