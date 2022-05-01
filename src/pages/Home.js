import React from 'react';
import {Image } from '@mantine/core';
import Intro from '../Sections/Intro';
import About from '../Sections/About';
import Mission from '../Sections/Mission';
import Team from '../Sections/Team';
import Review from '../Sections/Review';
import styled from 'styled-components';
import Benefits from '../Sections/Benefits';
import Footer from '../Sections/Footer';
import otherpic from '../img/otherpic.jpg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* position: relative; */
`;

function Home() {
  return (
    <Container>
      <Intro />
      <About />
      <Mission />
      <Image className="nurse-image sm:w-3/4 md:w-2/3 lg:w-3/4 xl:w-4/5 2xl:w-full" src={otherpic} alt="nurse" />
      <Team />
      <Review />
      <Benefits />
      <Footer />
    </Container>
  );
}

export default Home;
