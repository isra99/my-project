import React from 'react';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios'

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
  constructor(props) {
    super(props);
    this.state = {
        value: this.props.match.params.symbol,
        inputValue:this.props.match.params.symbol,
        rows: []
    };
  }

  fetchData(x){
    //alert(this.props.match.params.symbol);
      axios.get(`https://finnhub.io/api/v1/search?q=${x}&token=c3ldsgaad3if71c77vtg`)
          .then((resp) => {
            console.warn(resp.data.result[0])
              let data = [];
              for (var i = 0; i < resp.data.count; i++) {
                data.push({
                  'id': i, 
                  'description': resp.data.result[i].description, 
                  'displaySymbol': resp.data.result[i].displaySymbol,
                  'symbol': resp.data.result[i].symbol,
                  'type': resp.data.result[i].type
                });
              } 
              console.warn(data);
              this.setState({ 
                  rows: data
              });
          })
    }
  render(){
    return (
      <div>
        <Autocomplete
          value={this.state.value}
          onChange={(event, newValue) => {
            this.setState({ 
              value: newValue 
            }, () => {
              //loading: this.state.value !== null ? true : false
              this.props.history.push(`/stock/${this.state.value}`);
              this.fetchData(this.state.value);
              alert(this.state.value);
            });
          }}
          inputValue={this.state.inputValue}
          onInputChange={(event, newInputValue) => {
            this.setState({ 
              inputValue: newInputValue 
            }, () => {
              //loading: this.state.value !== null ? true : false
              this.fetchData(this.state.inputValue);
              //alert(this.state.value);
            });
          }}
          id="controllable-states"
          options={options}
          renderInput={(params) => <TextField {...params} label="Company" variant="outlined" />}
        />
        <br />
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={this.state.rows}
              columns={columns}
              pageSize={10}
              onRowClick={() => {
                const win = window.open("/info/"+this.props.match.params.symbol, "_blank");
                win.focus();
              }}
            />
        </div>
      </div>
    );
  }
}

export default withRouter(ControllableStates);
