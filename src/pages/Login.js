import { Card, Paper } from '@mantine/core';
import { LoginForm } from 'components/forms/LoginForm';
import React from 'react';

export default function Login() {

  return (
    <div className="m-auto flex place-content-center content-center justify-center lg:w-1/2">
      <Card radius={10} shadow="sm" padding="lg" className="mt-9 lg:w-2/3 md:w-2/3 w-4/5">
        <LoginForm/>
      </Card>
    </div>
  );
}
