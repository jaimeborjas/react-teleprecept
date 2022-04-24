import React, { useRef, useState } from 'react';
import { createStyles, Table, Checkbox, ScrollArea, Group, Avatar, Text, Button, TextInput } from '@mantine/core';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import endPoints from 'services/api';
//import { DatePicker } from '@mantine/dates';
import { CounterClockwiseClockIcon } from '@modulz/radix-icons';

const Timetable = () => {
  function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
  }
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
  const useStyles = createStyles((theme) => ({
      rowSelected: {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
            : theme.colors[theme.primaryColor][0],
      },
    }));
  
    const TableSelection = (timetable) => {
      //console.log(timetable.timetable)
      setData(timetable.timetable)
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
            <td>{item.date.substring(0,10)}</td>
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
    const [display, setDisplay] = useState(false)
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
      //console.log(id);
      return data;
    });
    //console.log(timetable)
    const submitHandler = async (event) => {
      event.preventDefault();
      logPost();
    };
    const displayTable = () =>
    {
      setDisplay(true)
    };
    const mutation = useMutation((log) => {
      axios.defaults.headers.api = 123;
      axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
      return axios.post(endPoints.base + `/timesheet/${id}`, log);
    });

    async function logPost () {
      const data = {
          connectionId: id,
          hours: hoursRef.current.value,
          date: dateRef.current.value,
          validated: false
      };
      //console.log(data)
      hoursRef.current.value = "";
      dateRef.current.value = "";
      mutation.mutate(data, {
        onSuccess: () => {
          refetch();
        },
      });
    };
    if(display === true)
    {
      //console.log(timetable[0].timesheet)
      return (
    <div className="w-full flex justify-left">
      <div className="hidden md:block md:w-2/3">
        <TableSelection timetable={timetable[0].timesheet}></TableSelection>
        <form onSubmit={submitHandler}>
          <TextInput
            ref={dateRef}
            placeholder="YYYY-MM-DD"
            label="Date"
            required
          />
          <TextInput
            ref={hoursRef}
            placeholder="Hours"
            label="Hours"
            required
          />
          <Button type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
    )
    }
    else
    {
    return (
    <div className="w-full flex justify-left">
      <div className="hidden md:block md:w-2/3">
        <Button type="button" onClick={displayTable}>
          Show Table
        </Button>
        <form onSubmit={submitHandler}>
          <TextInput
            ref={dateRef}
            placeholder="YYYY-MM-DD"
            label="Date"
            required
          />
          <TextInput
            ref={hoursRef}
            placeholder="Hours"
            label="Hours"
            required
          />
          <Button type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
    )
  }
};
    
export default Timetable;
    