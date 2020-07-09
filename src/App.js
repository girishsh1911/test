import React, { Component } from 'react';
import CsvFileReader from './components/CsvFileReader/CsvFileReader';
import OrderDetails from './components/OrderDetails/OrderDetails';

class App extends Component{
  render(){
    return(
       <CsvFileReader />
      //<OrderDetails />
    );
  }
}

export default App;
