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
          freeSolo
          id="free-solo-2-demo"
          options={options}
          renderInput={(params) => (
            <TextField
              {...params}
              onKeyDown={(newValue)=>{this.onChange(newValue)}} 
              label="Search input"
              margin="normal"
              variant="outlined"
              InputProps={{ ...params.InputProps, type: 'search' }}
            />
          )}
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
    if(event.keyCode == 13){
      isEmpty = false;
      axios.get(`https://api.polygon.io/v3/reference/tickers?search=${event.target.value}&active=true&sort=ticker&order=asc&limit=10&apiKey=fLlAuMmLGw7lrlP7bl7lFvvagKR6eatF`).then((response)=>{
        isFetching = true;
        var data = [];
        for (var i = 0; i < response.data.count; i++) {
          data.push({
          'id': i, 
          'ticker': response.data.results[i].ticker, 
          'name': response.data.results[i].name,
          'market': response.data.results[i].market,
          'locale': response.data.results[i].locale,
          'primary_exchange': response.data.results[i].primary_exchange,
          'type': response.data.results[i].type,
          });
        } 
        isFetching = false;
        console.log(data);
        this.props.InputChange(data);
      });
    }
  }
}

const mapStatetoProps = (state) => {
  return {
      inputValue: state.inputValue,
      rows: state.rows
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    InputChange: (data) => dispatch({type: "SEARCH", data:data})
  }
}
export default connect (mapStatetoProps, mapDispatchtoProps)(Search);