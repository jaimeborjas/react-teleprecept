import { Notification, Group, Button, TextInput, Title, PasswordInput, Select, Stepper, Textarea } from '@mantine/core';
import { useForm, joiResolver } from '@mantine/form';
import { Cross1Icon, LockClosedIcon } from '@modulz/radix-icons';
import { useAuth } from 'hooks/useAuth';
import Joi from 'joi';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import endPoints from 'services/api';
import { useMutation } from 'react-query';
import axios from 'axios';

export default function SignUpForm() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const nextStep = () => {
    if (!form.validate().hasErrors) setActive((current) => (current < 2 ? current + 1 : current));
  };
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const mutation = useMutation((newUser) => {
    axios.defaults.headers.api = `123`;
    return axios.post(endPoints.base + '/auth/signup', newUser);
  });
  const auth = useAuth();

  const schema = Joi.object({
    firstName: Joi.string().min(2).message('Name should have at least 2 letters'),
    lastName: Joi.string().min(2).message('Name should have at least 2 letters'),
    role: Joi.string().min(2).message('Role should be either preceptor or student'),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .message('Invalid email'),
    username: Joi.string().min(5).message('Username should be at least 5 characaters.').max(24).message('Username should be no more than 24 characaters.'),
    password: Joi.string().min(2).message('Password should have at least 8 characters'),
    confirmPassword: Joi.ref('password'),
    location: Joi.any(),
    specialty: Joi.any(),
    bio: Joi.any(),
  });
  let specialtyOptions = [
    { value: 'Attention Deficit Hyperactivity Disorder (ADHD)', label: 'Attention Deficit Hyperactivity Disorder (ADHD)' },
    { value: 'Anger Issues', label: 'Anger Issues' },
    { value: 'Anxiety', label: 'Anxiety' },
    { value: 'Autism Spectrum Disorders', label: 'Autism Spectrum Disorders' },
    { value: 'Biopolar Disorder', label: 'Biopolar Disorder' },
    { value: 'Depression', label: 'Depression' },
    { value: 'Eye Movement Desensitization and Reprocessing (EMDR)', label: 'Eye Movement Desensitization and Reprocessing (EMDR)' },
    { value: 'Family Caregiving Stress', label: 'Family Caregiving Stress' },
    { value: 'Gender Issues', label: 'Gender Issues' },
    { value: 'Insomnia', label: 'Insomnia' },
    { value: 'Job Stress', label: 'Job Stress' },
    { value: 'Medication Management', label: 'Medication Management' },
    { value: 'Obsessive Compulsive Disorder (OCD)', label: 'Obsessive Compulsive Disorder (OCD)' },
    { value: 'Post Traumatic Stress Disorder (PTSD)', label: 'Post Traumatic Stress Disorder (PTSD)' },
    { value: 'Psychosis and Schizophrenia Spectrum Disorders', label: 'Psychosis and Schizophrenia Spectrum Disorders' },
    { value: 'Stress', label: 'Stress' },
    { value: 'Substance Abuse', label: 'Substance Abuse' },
    { value: 'Suicidal Thoughts', label: 'Suicidal Thoughts' },
    { value: 'Therapy', label: 'Therapy' },
    { value: 'Trauma', label: 'Trauma' },
    { value: 'Other', label: 'Other' },
  ];
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      role: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      location: '',
      specialty: '',
      bio: '',
    },
    schema: joiResolver(schema),
    validate: {
      confirmPassword: (value, values) => (value !== values.password ? 'Passwords did not match' : null),
    },
  });
  const handleSubmit = async (values) => {
    const data = {
      email: values.email,
      username: values.username,
      password: values.password,
      role: values.role,
      userInfo: {
        firstName: values.firstName,
        lastName: values.lastName,
        location: values.location,
        specialty: values.specialty,
        bio: values.bio,
      },
    };
    await mutation.mutate(data, {
      onSuccess: () => {
        auth.signIn(values.email, values.password).then(() => {
          nextStep();
          navigate('/profile', { replace: true });
        });
      },
    });
  };
  return (
    <div className="h-fit space-y-4">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stepper active={active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step label="Fist step" description="Create an account">
            <Group className="w-full mt-10 flex flex-row">
              <div className="w-52">
                <TextInput {...form.getInputProps('firstName')} size="sm" placeholder="First Name" label="First Name" required />
              </div>
              <div className="w-52">
                <TextInput {...form.getInputProps('lastName')} size="sm" placeholder="Last Name" label="Last Name" required />
              </div>
            </Group>
            <Select
              size="sm"
              label="Role"
              placeholder="Role"
              searchable
              data={[
                { value: 'preceptor', label: 'Preceptor' },
                { value: 'student', label: 'Student' },
              ]}
              {...form.getInputProps('role')}
              required
            />
            <TextInput {...form.getInputProps('email')} placeholder="Email Address" label="Email Address" type="email" required />
            <TextInput {...form.getInputProps('username')} description="Use of real name is discouraged." placeholder="Username" label="Username" required />
            <PasswordInput
              {...form.getInputProps('password')}
              icon={<LockClosedIcon />}
              placeholder="Password"
              label="Password"
              description="Password must include at least one letter, number and special character"
              required
            />
            <PasswordInput {...form.getInputProps('confirmPassword')} icon={<LockClosedIcon />} placeholder="Confirm Password" label="Confirm Password" required />

            <Group sx={{ display: 'flex', justifyContent: 'center' }}></Group>
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Profile Information">
            <TextInput {...form.getInputProps('location')} placeholder="Location" label="Location" required />
            <Select {...form.getInputProps('specialty')} data={specialtyOptions} placeholder="Specialty" label="Specialty" required />
            <Textarea {...form.getInputProps('bio')} placeholder="Biography" label="Biography" required />
          </Stepper.Step>
        </Stepper>

        <Group position="center" mt="xl">
          <Button className={`${active === 0 ? 'hidden' : 'block'}`} variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button className={`${active === 1 ? 'hidden' : 'block'}`} onClick={nextStep}>
            Next step
          </Button>
          <Button className={`${active !== 1 ? 'hidden' : 'block'}`} type="submit" color="blue" loading={mutation.isLoading}>
            Create account
          </Button>
        </Group>
      </form>
      {mutation.isError && (
        <Notification onClose={() => mutation.reset()} icon={<Cross1Icon />} color="red">
          {JSON.stringify(mutation.error)}
        </Notification>
      )}
    </div>
  );
}
