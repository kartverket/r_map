import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import Layerswitch from './Layerswitch';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Layerswitch/>
        <Map/>
      </div>
    );
  }
}

export default App;
