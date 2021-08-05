import './App.css';
import React from 'react';
import Search from './Components/Search'
//let first = true;

class App extends React.Component {
  render(){
    //console.log(this.state.stock.o)
    return(
      <div>
        <Search />
      </div>
    )
  }
}
export default App;
