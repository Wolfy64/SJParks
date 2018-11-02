import React from 'react';
import './App.css';

class App extends React.Component{
  render (){
    return (
      <div>
        <div className="mx-auto">
            <h1>SJParks</h1>
            <div class="form-group">
              <label for="username">User ID: </label> <br />
              <input type="name" name="name" />
            </div>
            <div className ="form-group">
            <label for="password">Password: </label> <br />
            <input type="password" placeholder="Password" />
            </div>
        </div>
      </div>
    );
  }
};


export default App;