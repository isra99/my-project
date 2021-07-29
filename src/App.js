import './App.css';
import React from 'react';
import Autocomplete from './Components/Autocomplete'
import Main from './Main';
//let first = true;

class App extends React.Component {
  render(){
    //console.log(this.state.stock.o)
    return(
      <div>
        <Autocomplete />
      </div>
    )
  }
}
export default App;
