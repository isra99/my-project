import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DataGrid } from '@material-ui/data-grid';
import {connect} from 'react-redux';

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
          onChange={this.props.InputChange}
          inputValue={this.props.inputValue}
          onInputChange={this.props.InputChange}
          id="controllable-propss"
          options={options}
          renderInput={(params) => <TextField {...params} label="Company" variant="outlined" />}
        />
        <br />
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={this.props.rows}
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
}

const mapStatetoProps = (state) => {
  return {
      inputValue: state.inputValue,
      rows: state.rows
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    InputChange: (event, newValue) => dispatch({type: newValue})
  }
}
export default connect (mapStatetoProps, mapDispatchtoProps)(Autocomplete);