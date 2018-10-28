import React from 'react';
import './App.css';
import SideNav from './components/sidenav';
import TopNav from './components/topnav';

class App extends React.Component{
  render (){
    return (
      <div>
        <div className="d-flex">
        <SideNav />
        <TopNav />
        </div>
      </div>
    );
  }
};


export default App;