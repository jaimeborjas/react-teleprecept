import React from 'react';

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
