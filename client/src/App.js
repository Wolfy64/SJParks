import React from 'react';
import './App.css';
import Sidenav from './components/sidenav'
import Topnav from './components/topnav'
import { BrowserRouter, Route, Switch } from "react-router-dom";



class App extends React.Component{
    
  render (){
    
    return (
    <div>
        <Topnav/>
        <Sidenav/>
    </div>
    );
  }
};


export default App;