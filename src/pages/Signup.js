import { Card, Paper} from '@mantine/core';
import SignUpForm from 'components/forms/SignUpForm';
import React from 'react';


export default function SignUp() {

  return (
    <Paper className="flex justify-center content-center w-full h-fit mt-10">
      <Card  radius={10}shadow="sm" padding="lg">
        <SignUpForm />
      </Card>
    </Paper>
  );
}
