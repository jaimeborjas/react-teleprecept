import { Image, Title, Text, Divider, Button, Tabs } from '@mantine/core';
// import nurse from '../img/nurse.svg';
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

import Intro from '../Sections/Intro';
import About from '../Sections/About';
import Mission from '../Sections/Mission';
import Team from '../Sections/Team';
import Review from '../Sections/Review';
import styled from 'styled-components';
import Benefits from '../Sections/Benefits';

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
      <Team />
      <Review />
      <Benefits />
    </Container>
  );
}

export default Home;
