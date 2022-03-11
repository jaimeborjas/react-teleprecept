import { Card, Paper} from '@mantine/core';
import SignUpForm from 'components/forms/SignUpForm';
import React from 'react';


export default function SignUp() {
  return (
    <Paper className="m-auto flex place-content-center content-center justify-center lg:w-1/2">
      <Card shadow="sm" padding="lg">
        <SignUpForm />
      </Card>
    </Paper>
  );
}
