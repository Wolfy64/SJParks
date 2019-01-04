import React, { Component } from 'react'

class Login extends React.Component{
  render (){
    return (
      <div>
        <div className="mx-auto">
            <h1>SJParks</h1>
            <div class="form-group">
              <label for="username">User ID: </label> <br />
              <input type="name" name="name" placeholder="Enter Your Username" />
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


export default Login;