import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ParkSelectionField from './Components/ParkSelection';
import ParkProblemTextField from './Components/TextField';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ParkSelectionField/>
        <ParkProblemTextField/>
      </div>
    );
  }
}

export default App;
