import React, { useRef, useState } from 'react';
import { createStyles, Table, Checkbox, ScrollArea, Loader, Avatar, Text, Button, TextInput, Title } from '@mantine/core';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import endPoints from 'services/api';
import { DatePicker } from '@mantine/dates';
import { CheckIcon, Cross2Icon } from '@modulz/radix-icons';
import { useAuth } from 'hooks/useAuth';

const Timetable = () => {
  const { user } = useAuth();
  const isPreceptor = user.user.role === 'preceptor';
  const useStyles = createStyles((theme) => ({
    rowSelected: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2) : theme.colors[theme.primaryColor][0],
    },
  }));

  const TableSelection = ({ timetable, isPreceptor }) => {
    const data = timetable[0]?.timesheet || [];
    const { classes, cx } = useStyles();
    const [selection, setSelection] = useState(['1']);
    const toggleRow = (id: string) => setSelection((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
    const toggleAll = () => setSelection((current) => (current.length === data.length ? [] : data.map((item) => item.id)));

    const deleteHour = useMutation((id) => {
      axios.defaults.headers.api = 123;
      axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
      return axios.delete(endPoints.base + `/timesheet/${id}`);
    });

    const acceptHour = useMutation((id) => {
      axios.defaults.headers.api = 123;
      axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
      return axios.patch(endPoints.base + `/timesheet/${id}`);
    });

    const handleDelete = (id) => {
      deleteHour.mutate(id, {
        onSuccess: () => {
          refetch();
        },
      });
    };
    const handleAccept = (id) => {
      acceptHour.mutate(id, {
        onSuccess: () => {
          refetch();
        },
      });
    };
    const rows = data
      ?.sort((a, b) => {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
      })
      .map((item) => {
        const selected = selection.includes(item.id);
        // console.log(isPreceptor);
        return (
          <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
            <td>
              <Checkbox checked={item.validated} onChange={() => toggleRow(item.id)} transitionDuration={0} />
            </td>
            <td>{item.id}</td>
            <td>{item.date.substring(0, 10)}</td>
            <td>{item.hours}</td>
            {isPreceptor && (
              <td>
                <div className="flex gap-3">
                  {!item.validated  && <CheckIcon onClick={() => handleAccept(item.id)} className="scale-150 cursor-pointer" />}
                  <Cross2Icon onClick={() => handleDelete(item.id)} className="scale-150 cursor-pointer" />
                </div>
              </td>
            )}
          </tr>
        );
      });
    const total = data.reduce((total, item) => total + item.hours, 0);
    return (
      <ScrollArea>
        <Table sx={{ minWidth: 400 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th style={{ width: 50 }}>
                <Checkbox onChange={toggleAll} checked={selection.length === data.length} indeterminate={selection.length > 0 && selection.length !== data.length} transitionDuration={0} />
              </th>
              <th style={{ width: 40 }}>id</th>
              <th>Date</th>
              <th>Hours</th>
              {isPreceptor && <th style={{ width: 40 }}>Action</th>}
            </tr>
          </thead>
          <tbody>
            {rows}
            <tr>
              <td>Total Hours</td>
              <td></td>
              <td></td>
              <td>{total}</td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </ScrollArea>
    );
  };
  const { id } = useParams();
  const hoursRef = useRef(null);
  const dateRef = useRef(null);
  const {
    isLoading,
    data: timetable,
    isError,
    error,
    refetch,
  } = useQuery('timesheet', async () => {
    axios.defaults.headers.api = 123;
    axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    const { data } = await axios.get(endPoints.base + `/timesheet/${id}`);
    return data;
  });

  const submitHandler = async (event) => {
    event.preventDefault();
    await logPost();
  };
  const mutation = useMutation((log) => {
    axios.defaults.headers.api = 123;
    axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return axios.post(endPoints.base + `/timesheet/${id}`, log);
  });

  async function logPost() {
    const data = {
      connectionId: id,
      hours: hoursRef.current.value,
      date: dateRef.current.value,
      validated: false,
    };
    //console.log(data)
    hoursRef.current.value = '';
    dateRef.current.value = '';

    mutation.mutate(data, {
      onSuccess: () => {
        refetch();
      },
    });
  }
  if (isLoading || !timetable) {
    //console.log(timetable[0].timesheet)
    return <Loader />;
  } else {
    return (
      <div>
        <Title align="center" className="mt-10">
          Time Tracking
        </Title>
        <div className="w-full flex flex-col md:flex-row justify-left gap-8 mt-10">
          <div className="w-full md:w-3/4 pl-10">
            <TableSelection timetable={timetable} isPreceptor={isPreceptor}></TableSelection>
          </div>
          <div className="w-full md:w-1/4 px-5">
            <form className="w-full flex flex-col items-center justify-center" onSubmit={submitHandler}>
              <DatePicker className="w-full md:max-w-[400px]" ref={dateRef} placeholder="YYYY-MM-DD" inputFormat="YYYY-MM-DD" label="Date" required />
              <TextInput type="number" className="w-full md:max-w-[400px]" ref={hoursRef} placeholder="Hours" label="Hours" required />
              <Button className="mt-5" type="submit">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default Timetable;
