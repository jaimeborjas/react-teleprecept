import { Card, Avatar, Text, Divider, Title, Button, Checkbox, Modal, Group, TextInput, ScrollArea, Textarea, Select, Loader } from '@mantine/core';
import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const Upload = () => {
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('selectedFile', selectedFile);
    try {
      const response = axios({
        method: 'post',
        url: 'https://drive.google.com/drive/u/0/my-drive',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const [buttonText, setButtonText] = useState('Upload File');

  return (
    <div className="w-full mt-6">
      <form onSubmit={handleSubmit}>
        <div className="mt-16">
          <Title className="text-4xl title about text-inherit ">File Upload</Title>
        </div>
        <div className="mt-10 text-inherit">
          <Text className="text-2xl text-center">Resumes, cover letters, certificates, transcripts, and other documents can be uploaded to your profile</Text>
        </div>
        <div className="mt-10 text-center text-sky-200  ">
          <Button className="text-base text-center">
            <input type="file" onChange={handleFileSelect} />
            <div className="App">
              <button
                type="submit"
                onClick={() => {
                  setButtonText('File Successfully Uploaded');
                  setTimeout(() => {
                    setButtonText('Upload File');
                  }, 7000);
                }}
              >
                {buttonText}
              </button>
            </div>
          </Button>
        </div>
      </form>
    </div>
  );
};
export default Upload;
