import './App.css';
import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Autocomplete from './Components/Autocomplete'
import List from './Components/List';
import Main from './Main';
//let first = true;
class App extends React.Component {
  render(){
    //console.log(this.state.stock.o)
    return(
      <div>
        <Router>
          <Switch>
            <Route exact path="/info/:symbol" component={Main}/>
            <Route path="/stock/:symbol" component={Autocomplete}/>
            <Route path="/" component={Autocomplete}/>
          </Switch>
        </Router>
      </div>
    )
  }
}
export default App;
