import React, { useRef, useState } from 'react';
import { createStyles, Table, Checkbox, ScrollArea, Group, Avatar, Text, Button, TextInput } from '@mantine/core';
import { useMutation, useQuery, useParams } from 'react-query';
import axios from 'axios';
import endPoints from 'services/api';
import { CounterClockwiseClockIcon } from '@modulz/radix-icons';

const Timetable = () => {
  const { id } = useParams();
  const useStyles = createStyles((theme) => ({
      rowSelected: {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
            : theme.colors[theme.primaryColor][0],
      },
    }));

    const TableSelection = () => {
      const [data, setData] = useState([{"hours": 3,
                                        "date": "12/31/2022",
                                        "verified": true,
                                        "id": '1'},
                                        {"hours": 4,
                                        "date": "12/31/2022",
                                        "verified": true,
                                        "id": '2'},
                                        {"hours": 2,
                                        "date": "12/31/2022",
                                        "verified": false,
                                        "id": '3'}])
      const { classes, cx } = useStyles();
      const [selection, setSelection] = useState(['1']);
      const toggleRow = (id: string) =>
        setSelection((current) =>
          current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
        );
      const toggleAll = () =>
        setSelection((current) => (current.length === data.length ? [] : data.map((item) => item.id)));
      
      const rows = data.map((item) => {
        const selected = selection.includes(item.id);
        return (
          <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
            <td>
              <Checkbox
                checked={selection.includes(item.id)}
                onChange={() => toggleRow(item.id)}
                transitionDuration={0}
              />
            </td>
            <td>{item.date}</td>
            <td>{item.hours}</td>
          </tr>
        );
      });
      
      return (
        <ScrollArea>
          <Table sx={{ minWidth: 400 }} verticalSpacing="sm">
            <thead>
              <tr>
                <th style={{ width: 40 }}>
                  <Checkbox
                    onChange={toggleAll}
                    checked={selection.length === data.length}
                    indeterminate={selection.length > 0 && selection.length !== data.length}
                    transitionDuration={0}
                  />
                </th>
                <th>Date</th>
                <th>Hours</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
      );
    }
    /*const mutation = useMutation((newPost) => {
      axios.defaults.headers.api = `123`;
      axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
      return axios.post(endPoints.base + '/messages/send', newPost);
    });*/
    const hoursRef = useRef(null);
    const dateRef = useRef(null);
    const {
      isLoading,
      data: timetable,
      isError,
      error,
      refetch,
    } = useQuery('timesheet', async () => {
      axios.defaults.headers.api = `123`;
      axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
      const { data } = await axios.get(endPoints.base + `/timesheet/${id}`);
      return data;
    });
    console.log(timetable)

    const submitHandler = async (event) => {
      event.preventDefault();
      logPost();
    };

    const mutation = useMutation((log) => {
      axios.defaults.headers.api = `123`;
      axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
      return axios.patch(endPoints.base + `/timesheet/${id}`, log);
    });

    async function logPost () {
      const data = {
          hours: hoursRef.current.value,
          date: dateRef.current.value,
          validated: false
      };
      mutation.mutate(data, {
        onSuccess: () => {
          refetch();
        },
      });
    };
    return (
    <div className="w-full flex justify-left">
      <div className="hidden md:block md:w-2/3">
        <TableSelection></TableSelection>
        <form action=''>
          <TextInput
            ref={dateRef}
            placeholder="date"
            label="Full name"
            required
          />
          <TextInput
            ref={hoursRef}
            placeholder="Hours"
            label="Full name"
            required
          />
          <Button type="submit" onClick={submitHandler}>
            Submit
          </Button>
        </form>
      </div>
    </div>
    )
};
    
export default Timetable;
    