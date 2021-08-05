import React, { useEffect, useState } from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {connect} from 'react-redux';
import axios from 'axios';
import Loader from './Loader'
import DataGrid from './DataGrid';

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

const Search = (props) => {
  const [value, setValue] = useState();
  const [data, setData] = useState();
  const [empty, setEmpty] = useState(true);
  const [loading, setLoading] = useState(false);

  const onChange = (event) => {
    if(event.keyCode == 13){
      setValue(event.target.value);
      fetchData();
      setEmpty(false);
    }
  }
  const fetchData = () => {
    setLoading(true);
    axios.get(`https://api.polygon.io/v3/reference/tickers?search=${value}&active=true&sort=ticker&order=asc&limit=10&apiKey=fLlAuMmLGw7lrlP7bl7lFvvagKR6eatF`).then((response)=>{
      //alert(loading);
      var output = [];
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
      setData(output);
      setLoading(false);
      console.log(data);
      props.InputChange(data);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
      <div>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          options={options}
          renderInput={(params) => (
            <TextField
              {...params}
              onKeyDown={(newValue)=>{onChange(newValue)}} 
              label="Search input"
              margin="normal"
              variant="outlined"
              InputProps={{ ...params.InputProps, type: 'search' }}
            />
          )}
        />    
        <br />
        {empty
          ? <h2>Search Company...</h2>
          : (loading
            ? 
            <Loader />
            : <DataGrid rows={props.rows}/>)
        }
      </div>
    );
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