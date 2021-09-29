import React from 'react';
import DataTable from 'react-data-table-component';
import Card from '@mui/material/Card';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SortIcon from '@material-ui/icons/ArrowDownward';
import axios from 'axios';
// import './styles.css';

var ts: string = String(Math.round(new Date().getTime() / 1000));

const columns = [
  {
    name: 'Author',
    selector: 'author',
    sortable: true,
  },
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Creation Date',
    selector: 'creation_date',
    sortable: true,
    right: true,
  },
];

//this is the main list in which we need all the fetched data
let li: any = [];

interface DATA_MODEL {
  author: string;
  title: string;
  creation_date: string;
}

export type Props = {};

export type State = {
  page: number;
  array: DATA_MODEL[];
};

class Hello extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props);
    this.state = {
      page: 1,
      array: [],
    };
  }

  async componentDidMount() {
    let data: any = await this.get_formatted_question();
    li = data;
    this.setState({ array: li });
    window.addEventListener('scroll', this.trackScrolling);
  }

  async pageIncrement() {
    let next_page = this.state.page + 1;
    this.setState({ page: next_page });
    let data: any = await this.get_formatted_question();
    li = li.concat(data);
    this.setState({ array: li });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.trackScrolling);
  }

  isBottom(el: any) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  trackScrolling = () => {
    const wrappedElement = document.getElementById('header');
    if (this.isBottom(wrappedElement)) {
      this.pageIncrement();
    }
  };

  async get_formatted_question() {
    let url: string = `https://api.stackexchange.com/2.2/questions?order=desc&site=stackoverflow&creation_date=${ts}6&page=${this.state.page}`;
    let data_list: any = [];
    await axios.get(url).then((response) => {
      let items = response.data.items;
      for (let i = 0; i < items.length; i++) {
        let data = { author: '', title: '', creation_date: '' };
        data['author'] = items[i].owner.display_name;
        data['title'] = items[i].title;
        let timestamp: number = items[i].creation_date;
        data['creation_date'] = this.timeConverter(timestamp);
        data_list.push(data);
      }
    });
    return data_list;
  }

  timeConverter(UNIX_timestamp: number) {
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
  }

  render() {
    return (
      <div id='header'>
        {/* <AppBar style={{ backgroundColor: '#000000' }}>
          <Toolbar>
            <Typography variant='h4' component='div'>
              STACK OVERFLOW QUESTIONS
            </Typography>
          </Toolbar>
        </AppBar> */}
        <Card>
          <DataTable
            title='STACK OVERFLOW QUESTIONS'
            columns={columns}
            data={this.state.array}
            highlightOnHover={true}
            pointerOnHover={true}
            sortIcon={<SortIcon />}
            striped
            pagination
            selectableRows
          />
        </Card>
      </div>
    );
  }
}

export default Hello;
