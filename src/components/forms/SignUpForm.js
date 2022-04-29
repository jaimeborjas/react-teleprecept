import { Notification, Group, Button, TextInput, Title, Text, PasswordInput, Select, Stepper, Textarea, Anchor, Checkbox, Modal, ScrollArea, MultiSelect } from '@mantine/core';
import { useForm, joiResolver } from '@mantine/form';
import { Cross1Icon, LockClosedIcon } from '@modulz/radix-icons';
import { useAuth } from 'hooks/useAuth';
import Joi from 'joi';

import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import endPoints from 'services/api';
import { useMutation } from 'react-query';
import axios from 'axios';

export default function SignUpForm() {
  const [active, setActive] = useState(0);
  const [specVal, setSpecVal] = useState([]);
  const [newSpec, setNewSpec] = useState('');
  const navigate = useNavigate();
  const specRef = useRef(null);
  const [checked, setChecked] = useState(false);
  const [opened, setOpened] = useState(false);

  const checkboxHandler = () => {
    setChecked(!checked);
  };

  const nextStep = () => {
    if (!form.validate().hasErrors) setActive((current) => (current < 3 ? current + 1 : current));
    console.log(active);
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

  const customSpec = () => {
    if (specVal.some((o) => o === 'Other')) {
      return (
        <TextInput
          placeholder="Your Specialty"
          label="Please Specify"
          value={newSpec}
          onChange={(event) => {
            setNewSpec(event.currentTarget.value);
          }}
          required
        />
      );
    }
  };

  const ViewTerms = () => {
    return (
      <div>
        <Modal opened={opened} onClose={() => setOpened(false)} size="xl">
          <Title className="text-2xl" align="center">
            Terms and Conditions
          </Title>
          <ScrollArea className="mt-5 ml-5 pb-5 mb-3 h-[300px]" offsetScrollbars type="always">
            <Text className="text-sm mr-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut faucibus facilisis elit non ullamcorper. Nulla ipsum dolor, tempor in sodales in, blandit a orci. Praesent nec dapibus ante.
              Maecenas facilisis quam ut leo luctus pellentesque. Donec ut bibendum ex. In mattis elit id tincidunt sodales. Donec eu finibus arcu. Sed sit amet est vel tortor ultricies rhoncus.{' '}
              <br />
              Maecenas enim ex, ullamcorper at molestie id, condimentum quis nulla. Ut id urna non risus feugiat iaculis. Pellentesque tortor arcu, condimentum ac vehicula eget, interdum vitae lacus.
              Ut vel orci purus. Nullam in ultricies eros. Nullam dignissim maximus lacus, sed imperdiet arcu porttitor in. Vivamus vitae arcu nulla. Cras vel augue quis lacus blandit euismod. <br />
              Curabitur eget aliquet dui. Pellentesque congue non velit at vehicula. Aliquam pretium elit sed augue bibendum sollicitudin. Aliquam porttitor urna sed nisi iaculis, sit amet tincidunt
              justo elementum. Quisque varius ex eget magna aliquam, sed laoreet mi maximus. Mauris tincidunt ornare tellus quis congue. <br /> Suspendisse et lacus vestibulum, consequat purus ut,
              sollicitudin mauris. Suspendisse interdum sed ante id cursus. Vivamus eget nisl suscipit, lobortis libero eu, ullamcorper dolor. Duis rhoncus, urna et rutrum dignissim, lacus nisl
              ultricies nulla, quis consectetur diam turpis vel libero. Fusce volutpat sed ante a feugiat. Ut consectetur maximus congue.
            </Text>
          </ScrollArea>
          <Group position="center">
            <Button onClick={() => setOpened(false)}>OK</Button>
          </Group>
        </Modal>
      </div>
    );
  };

  let specialtyOptions = [
    { value: 'Attention Deficit Hyperactivity Disorder (ADHD)', label: 'Attention Deficit Hyperactivity Disorder (ADHD)' },
    { value: 'Anger Issues', label: 'Anger Issues' },
    { value: 'Anxiety', label: 'Anxiety' },
    { value: 'Autism Spectrum Disorders', label: 'Autism Spectrum Disorders' },
    { value: 'Bipolar Disorder', label: 'Bipolar Disorder' },
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
    let specList = specVal.toString();
    if (specList.indexOf('Other') != -1) specList = specList.replace('Other', newSpec);
    const data = {
      email: values.email,
      username: values.username,
      password: values.password,
      role: values.role,
      userInfo: {
        firstName: values.firstName,
        lastName: values.lastName,
        location: values.location,
        specialty: specList,
        bio: values.bio,
      },
    };
    console.log(newSpec);
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
        <Stepper className="h-full" active={active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step label="First Step" description="Create An Account">
            <Group className="w-full mt-10 flex flex-row">
              <div className="w-[264px]">
                <TextInput {...form.getInputProps('firstName')} size="sm" placeholder="First Name" label="First Name" required />
              </div>
              <div className="w-[264px]">
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
            <TextInput {...form.getInputProps('email')} placeholder="Email Address" description="Use your work or school email" label="Email Address" type="email" required />
            <TextInput {...form.getInputProps('username')} description="Use of real name is discouraged" placeholder="Username" label="Username" required />
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
          <Stepper.Step label="Second Step" description="Profile Information">
            <TextInput {...form.getInputProps('location')} placeholder="Location" label="Location" required />
            <MultiSelect {...form.getInputProps('specialty')} ref={specRef} data={specialtyOptions} value={specVal} onChange={setSpecVal} placeholder="Specialty" label="Specialty" required />
            {customSpec()}
            <Textarea {...form.getInputProps('bio')} placeholder="Biography" label="Biography" required />
          </Stepper.Step>
          <Stepper.Step label="Final Step" description="Reminders">
            <ViewTerms />
            <Text className="pt-5 text-center">
              Please read the{' '}
              <Link to={ViewTerms} onClick={() => setOpened((s) => !s)}>
                Terms & Conditions
              </Link>
            </Text>
            <Text className="pt-5 text-center">Remember to add a detailed bio on the Profile page.</Text>
          </Stepper.Step>
        </Stepper>

        <Group position="center" mt="xl">
          <Button className={`${active === 0 ? 'hidden' : 'block'}`} variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button className={`${active === 2 ? 'hidden' : 'block'}`} onClick={nextStep}>
            Next
          </Button>
          <Button className={`${active !== 2 ? 'hidden' : 'block'}`} type="submit" color="blue" loading={mutation.isLoading}>
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
