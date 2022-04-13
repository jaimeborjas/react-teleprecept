import React, { useRef, useState } from 'react';
import { Modal, Title, TextInput, Select, Button, ScrollArea, Group, Textarea } from '@mantine/core';

function ViewUser({ opened }) {
  //console.log('viewuser ', opened);
  // const submitHandler = async (event) => {
  //   event.preventDefault();

  //   setOpened(false);
  // };
  const hide = () => {
    Modal.style = 'display: none';
  };
  return (
    <Modal opened={opened}>
      <Title align="center" className="text-2xl">
        Profile Information
      </Title>
      <ScrollArea className="mt-10" offsetScrollbars type="always" style={{ height: 300 }}></ScrollArea>
    </Modal>
  );
}

export default ViewUser;
