import React, {useState} from 'react';
//import { Notification, Button, TextInput, Title, Text, PasswordInput, Select, Stepper, Textarea, Anchor, Checkbox, MultiSelect } from '@mantine/core';
import { Title, Button, Text, Group, ScrollArea, Modal } from '@mantine/core';
import { useNavigate, Link } from 'react-router-dom'


const Footer = () => {
    const [opened, setOpened] = useState(false);
    const ViewTerms = () => {
        return (
          <div>
            <Modal opened={opened} onClose={() => setOpened(false)} size="xl">
              <Title className="text-sm" align="center">
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
  return (
    <div className="flex justify-center items-center mt-16 mb-10 w-full h-32 bg-teal-500">
      <Title className="text-sm text-center text-white">
        <Text className="inline title text-sm text-cyan-900">Copyright 2022 Teleprecept-Match</Text> <br /> Contact Us: telepreceptmatch@gmail.com <br />
        <ViewTerms /> 
        <Link to={ViewTerms} onClick={() => setOpened((s) => !s)}>
            Terms & Conditions
        </Link>
      </Title>
    </div>
  );
};

export default Footer;
