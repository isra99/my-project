import './App.css';
import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Autocomplete from './Components/Autocomplete'
import DataTable from './Components/DataGrid';
import Content from './Components/Content';
//let first = true;
class App extends React.Component {
  render(){
    //console.log(this.state.stock.o)
    return(
      <div>
        <Router>
        <Autocomplete />
          <Switch>
            <Route path="/stock/:symbol" component={DataTable}/>
            <Route path="/info/:symbol" component={Content}/>
          </Switch>
        </Router>
      </div>
    )
  }
}
export default App;
