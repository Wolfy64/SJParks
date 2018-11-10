import React from 'react';
import './App.css';
import Sidenav from './components/sidenav'
import Topnav from './components/topnav'

class App extends React.Component{
  render (){
    return (
    <div>
        <Sidenav />
        <div className="page" id="content-wrapper">
            <Topnav />
            <p>paragraph easdfvrasdfvtfyuiol</p>
        </div>
        
    </div>
    );
  }
};


export default App;