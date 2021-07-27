import React from 'react';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
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

let loading = true;

class ControllableStates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        value: options[0],
        inputValue: options[0],
    };
  }

  render(){
    return (
      <div>
        <Autocomplete
          value={this.state.value}
          onChange={(event, newValue) => {
            this.setState({ 
              value: newValue 
            });
            //loading: this.state.value !== null ? true : false
            this.props.history.push(`/${this.state.value}`);
            alert(this.state.value);
          }}
          inputValue={this.state.inputValue}
          onInputChange={(event, newInputValue) => {
            this.setState({ 
              inputValue: newInputValue 
            });
            //loading: this.state.value !== null ? true : false
          }}
          id="controllable-states"
          options={options}
          renderInput={(params) => <TextField {...params} label="Company" variant="outlined" />}
        />
        <br />
        <DataGrid loading={loading}/>
      </div>
    );
  }
}

export default withRouter(ControllableStates);
