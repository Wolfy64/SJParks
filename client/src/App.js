import React from 'react';
import './App.css';
import Login from './components/login'
import Sidenav from './components/sidenav'
import Topnav from './components/topnav'

class App extends React.Component{
  render (){
    return (
    <div>
        <Sidenav />
        <Topnav />
        <p>paragraph</p>
        
        
    </div>
    );
  }
};


export default App;