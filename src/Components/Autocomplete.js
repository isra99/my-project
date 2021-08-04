import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DataGrid } from '@material-ui/data-grid';
import {connect} from 'react-redux';
import axios from 'axios';

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

let loading = true;

class ControllableStates extends React.Component {
  render(){
    return (
      <div>
        <Autocomplete
          value={this.props.inputValue}
          onChange={(newValue)=>{this.onChange(newValue)}}
          inputValue={this.props.inputValue}
          id="controllable-propss"
          options={options}
          renderInput={(params) => <TextField {...params} label="Company" variant="outlined" />}
        />
        <br />
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={this.props.rows?this.props.rows:[]}
              columns={columns}
              pageSize={10}
              onRowClick={() => {
                const win = window.open("/info/"+this.props.inputValue, "_blank");
                win.focus();
              }}
            />
        </div>
      </div>
    );
  }
  onChange(event){
    console.log("changed");
    axios.get(`https://finnhub.io/api/v1/search?q=${event.target.textContent}&token=c3ldsgaad3if71c77vtg`).then((response)=>{
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
      this.forceUpdate();
      this.props.InputChange(data);
    });
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
    InputChange: (data) => dispatch({type: "apple", data:data})
  }
}
export default connect (mapStatetoProps, mapDispatchtoProps)(ControllableStates);