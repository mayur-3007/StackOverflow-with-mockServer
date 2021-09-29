import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import CustomPagination from './Pagination';
import { columns } from './Columns';

const useStyles = makeStyles({
  root: {
    '& .super-app-theme--header': {
      backgroundColor: 'rgba(255, 7, 0, 0.55)',
    },
  },
});

const StackOverflow = () => {
  const classes = useStyles();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    onLoadFetch();
  }, []);

  const onLoadFetch = async () => {
    let data = await get_formatted_question();
    console.log(data);
    setTableData(data);
  };

  const get_formatted_question = async () => {
    let url = `http://localhost:3002/api/data`;
    let data_list = [];
    let questions = await axios.get(url);
    console.log(questions, 'QUESTIONS');
    let items = questions.data.items;
    for (let i = 0; i < items.length; i++) {
      let data = {
        id: 1,
        author: '',
        title: '',
        creation_date: '',
        question_link: '',
      };
      data['id'] = data.id + i;
      data['author'] = items[i].owner.display_name;
      data['title'] = items[i].title;
      data['question_link'] = items[i].link;
      let timestamp = items[i].creation_date;
      data['creation_date'] = timeConverter(timestamp);
      data_list.push(data);
    }
    return data_list;
  };

  const timeConverter = (UNIX_timestamp) => {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
  };

  return (
    <div style={{ height: 700, width: '100%' }} className={classes.root}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={12}
        components={{
          Pagination: CustomPagination,
        }}
      />
    </div>
  );
};

export default StackOverflow;
