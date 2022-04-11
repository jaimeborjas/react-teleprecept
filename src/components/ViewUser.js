import React, { useRef, useState } from 'react';
import { Modal, Title, TextInput, Select, Button, ScrollArea, Group, Textarea } from '@mantine/core';

function ViewUser() {
  return (
    // <Modal>
    //   <Title align="center" className="text-2xl">
    //     {user}
    //   </Title>
    //   <ScrollArea className="mt-10" offsetScrollbars type="always" style={{ height: 300 }}>
    //     <TextInput ref={props.emailRef} type="email" defaultValue={props.userData.user.email ?? ''} placeholder="Email" label="Email" required />
    //     <Group>
    //       <TextInput ref={props.firstNameRef} placeholder="First Name" defaultValue={props.userData.user.userInfo.firstName ?? ''} label="First Name" required />
    //       <TextInput ref={props.lastNameRef} placeholder="Last Name" defaultValue={props.userData.user.userInfo.lastName ?? ''} label="Last Name" required />
    //     </Group>
    //     <TextInput ref={props.ocationRef} placeholder="Location" defaultValue={props.userData.user.userInfo.location ?? ''} label="Location" required />
    //     <Select
    //       ref={props.specialtyRef}
    //       data={props.specialtyOptions}
    //       defaultValue={props.userData.user.userInfo.specialty}
    //       value={props.specVal}
    //       onChange={props.setSpecVal}
    //       placeholder="Specialty"
    //       label="Specialty"
    //       required
    //     />
    //     <Textarea ref={props.bioRef} placeholder="Biography" defaultValue={props.userData.user.userInfo.bio ?? ''} label="Biography" required />
    //   </ScrollArea>
    //   <Group sx={{ display: 'flex', justifyContent: 'center' }}>
    //     <Button loading={props.mutation.isLoading} onClick={props.submitHanlder} color="blue" style={{ marginTop: 14 }}>
    //       Update
    //     </Button>
    //   </Group>
    // </Modal>
    {}
  );
}

export default ViewUser;
