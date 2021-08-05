import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {connect} from 'react-redux';
import axios from 'axios';
import Loader from './Loader'
import DataGrid from './DataGrid';

let isFetching = false;
let isEmpty = true;
const options = [
  "AMZN",
  "BRK.B",
  "AAPL",
  "GOOG",
  "MSFT",
  "JPM",
  "FB",
  "JNJ",
  "TSLA",
  "V"
];

const columns = [
  { field: 'id', headerName: 'ID', width: 120 },
  {
    field: 'description',
    headerName: 'Description',
    width: 300,
    editable: false,
  },
  {
    field: 'displaySymbol',
    headerName: 'Display Symbol',
    width: 300,
    editable: false,
  },
  {
    field: 'symbol',
    headerName: 'Symbol',
    width: 300,
    editable: false,
  },
  {
    field: 'type',
    headerName: 'Type',
    sortable: false,
    width: 300,
  },
];

class Search extends React.Component {
  render(){
    return (
      <div>
        <Autocomplete
          value={this.props.inputValue}
          onChange={(newValue)=>{this.onChange(newValue)}}
          id="controllable-propss"
          options={options}
          renderInput={(params) => <TextField {...params} label="Company" variant="outlined" />}
        />        
        <br />
        {isEmpty
          ? <h2>Search Company...</h2>
          : (isFetching
            ? 
            <Loader loading={isFetching}/>
            : <DataGrid rows={this.props.rows}/>)
        }
      </div>
    );
  }
  onChange(event){
    isEmpty = false;
    axios.get(`https://finnhub.io/api/v1/search?q=${event.target.textContent}&token=c3ldsgaad3if71c77vtg`).then((response)=>{
      isFetching = true;
      var data = [];
      for (var i = 0; i < response.data.count; i++) {
        data.push({
        'id': i, 
        'description': response.data.result[i].description, 
        'displaySymbol': response.data.result[i].displaySymbol,
        'symbol': response.data.result[i].symbol,
        'type': response.data.result[i].type
        });
      } 
      isFetching = false;
      console.log(data);
      this.props.InputChange(data);
    });
  }
}

const mapStatetoProps = (state) => {
  //console.log('mapState');
  //console.log(state.inputValue);
  //console.log(state.rows);
  return {
      inputValue: state.inputValue,
      rows: state.rows
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    InputChange: (data) => dispatch({type: "apple", data:data})
  }
}
export default connect (mapStatetoProps, mapDispatchtoProps)(Search);