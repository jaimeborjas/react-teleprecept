import React from 'react';
import { Title, Text, Grid } from '@mantine/core';
import '../css/style.css';
import { UsageIcon, SecurityIcon, CoverageIcon, AccessibilityIcon, Border } from '../img/AllSvg';
// import curve from '../img/wave-haikei.svg';

const About = () => {
  return (
    <div className="w-full mt-8">
      <Border />

      <div className="mt-12">
        <Title className=" text-center text-stone-900">Why Teleprecept-Match?</Title>
      </div>
      <div className="mt-12 items-center">
        <Grid justify="space-between" align="center" style={{ textAlign: 'center' }}>
          <Grid.Col span={3} className="">
            <SecurityIcon fill="#34d399" />
            <Title className="text-xl title w-full">Security</Title>
            <Text className="text-md text pr-8 pl-8">HIPAA compliant. We believe in privacy and security.</Text>
          </Grid.Col>
          <Grid.Col span={3}>
            <UsageIcon fill="#34d399" />
            <Title className="text-xl title">Ease of Use</Title>
            <Text className="text-md text pr-8 pl-8">No downloads required. Cross-platform support. We believe in simplicity.</Text>
          </Grid.Col>
          <Grid.Col span={3}>
            <AccessibilityIcon fill="#34d399" />
            <Title className="text-xl title">Accessibility</Title>
            <Text className="text-md text pr-8 pl-8">Meets ADA requirements. Designed with Accessibility in mind.</Text>
          </Grid.Col>
          <Grid.Col span={3}>
            <CoverageIcon fill="#34d399" />
            <Title className="text-xl title">Coverage</Title>
            <Text className="text-md text pr-8 pl-8">Our product is intented to provide service to students and preceptors nationwide.</Text>
          </Grid.Col>
        </Grid>
      </div>
    </div>
  );
};

export default About;

