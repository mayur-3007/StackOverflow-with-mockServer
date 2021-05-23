import React, {useState , useEffect} from 'react';
import DataTable from "react-data-table-component";
import Card from "@material-ui/core/Card";
import SortIcon from "@material-ui/icons/ArrowDownward";
import Axios from 'axios'
import { getAllJSDocTags } from 'typescript';

type MyProps = {
  message: string;
};
type MyState = {
  pageNumber: number;
  Author: string[];
  Title: string[];
  Creation_Date: string[]
};

class Stack1 extends React.Component<MyProps, MyState> {
  state: MyState = {
    pageNumber: 1,
    Author : [],
    Title : [],
    Creation_Date : []
  };

  url = `https://api.stackexchange.com/2.2/questions?order=desc&sort=activity&site=stackoverflow&creation_date=1621676596&page=${this.state.pageNumber}`

  componentDidMount() {
    this.getData();
  }

  getData = async() => {
    const result = await Axios.get(this.url);
        for(var i=0; i < result.data.items.length; i++){
          this.state.Author.push(result.data.items[i].owner.display_name)
          this.state.Title.push(result.data.items[i].title)
          this.state.Creation_Date.push(result.data.items[i].creation_date)
        }

    console.log(this.state.Author[0].toString())
    console.log(this.state.Title)
    console.log(this.state.Creation_Date)
  }

  render() {
    return (
      <div>
        <Card>
        <div className="container">
          <h4>Author : {}</h4>
          <h4>Title : {}</h4>
          <h4>Creation Date : {}</h4>
        </div>
      </Card>
    </div>
    );
  }
}

function Stack() {
    const [state , setState] = useState([])
    const [page , setPage] = useState(1)
 
    useEffect(() => {
        fetch(`https://api.stackexchange.com/2.2/questions?order=desc&sort=activity&site=stackoverflow&creation_date=1621676596&page=${page}`)
        .then(res => res.json())
    },[page]);

}

export default Stack;