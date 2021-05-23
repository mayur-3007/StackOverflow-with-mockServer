import React from 'react';
import DataTable from "react-data-table-component";
import Card from "@material-ui/core/Card";
import SortIcon from "@material-ui/icons/ArrowDownward";
import axios from 'axios';

var ts:string = String(Math.round((new Date()).getTime() / 1000));

const columns = [
  {
    name: "Author",
    selector: "author",
    sortable: true
  },
  {
    name: "Title",
    selector: "title",
    sortable: true
  },
  {
    name: "Creation Date",
    selector: "creation_date",
    sortable: true,
    right: true
  }
];


//this is the main list in which we need all the fetched data
let li:any = []

interface DATA_MODEL  {
  author:string;
  title:string;
  creation_date:string;
}

export type Props = {
};

export type State = {
  page:number;
  array:DATA_MODEL[]
};

class Hello extends React.Component<Props, State>{

  constructor(props: Props, state:State) {
    super(props);
    this.state = {
      page:1,
      array: []
    }
  }

  async componentDidMount() {
    let data:any = await this.get_formatted_question()
    li = data
    this.setState({array:li})
    window.addEventListener('scroll', this.trackScrolling);
  }

  async pageIncrement(){
    let next_page = this.state.page + 1
    this.setState({page:next_page})
    let data:any = await this.get_formatted_question()
    li = li.concat(data)
    this.setState({array:li})
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.trackScrolling)
  }

  isBottom(el:any) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  trackScrolling = () => {
    const wrappedElement = document.getElementById('header');
    if (this.isBottom(wrappedElement)) {
      this.pageIncrement()
    }
  };
  // handleScroll(){
  //   const wrappedElement = document.getElementById('header');
  //   if (this.isBottom(wrappedElement)) {
  //     console.log('header bottom reached');
  //     document.removeEventListener('scroll', this.handleScroll);
  //   }
  // }
async get_formatted_question(){
  let url:string = `https://api.stackexchange.com/2.2/questions?order=desc&site=stackoverflow&creation_date=${ts}6&page=${this.state.page}`
  let data_list:any = []
  await axios.get(url)
      .then(response => {
        for(var i = 0 ;i<response.data.items.length;i++){
          var data = {author:'',title:'',creation_date:''}
          data['author'] = response.data.items[i].owner.display_name
          data['title'] = response.data.items[i].title
          let timestamp:number = response.data.items[i].creation_date
          data['creation_date'] = this.timeConverter(timestamp)
          data_list.push(data)
        }
      
      });
      return data_list
}


 timeConverter(UNIX_timestamp:number){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}


  render(){
  return (
    <div id='header'>
        <Card>
        <DataTable
          title="Questions"
          columns={columns}
          data={this.state.array}
          sortIcon={<SortIcon />}
        />
      </Card>
      
    </div>
  );
  }
};



export default Hello;