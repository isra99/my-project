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
  const [oldValue, setOldValue] = useState("empty");
  const [data, setData] = useState();
  const [empty, setEmpty] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchData();
  }, [value]);
  const onChange = (event) => {
    if(event.keyCode == 13){
      setValue(event.target.value);
      fetchData();
      setEmpty(false);
    }
    props.SetHide(true);
  }
  const fetchData = () => {
    setLoading(true);
    
    new Promise(resolve => 
      setTimeout(resolve, 5000)
      );

    axios.get(`https://api.polygon.io/v3/reference/tickers?search=${value}&active=true&sort=ticker&order=asc&limit=10&apiKey=fLlAuMmLGw7lrlP7bl7lFvvagKR6eatF`).then((response)=>{
      //alert(loading);
      if(!(oldValue === value)){
        var output = [];
        for (var i = 0; i < response.data.count; i++) {
          output.push({
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
        setOldValue(value);
        setLoading(false);
        console.log("TEST");
        console.log(output);
        props.InputChange(output);
      } else{
        if(oldValue === "empty"){
          setOldValue(value);
          fetchData();
          alert("same");
        }
      }
    });
  }
  
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
    InputChange: (data) => dispatch({type: "SEARCH", data:data}),
    SetHide: (data) => dispatch({type: "SETHIDE", data:data})
  }
}
export default connect (mapStatetoProps, mapDispatchtoProps)(Search);