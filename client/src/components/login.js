import React, { Component } from 'react'
import Button from './UI/Generic/Button'

class Login extends React.Component{
  render (){
    return (
      <div>
        <div>
            <h1>SJParks</h1>
            <div>
              <label for="username">User ID: </label> <br />
              <input type="name" name="name" placeholder="Enter Your Username" />
            </div>
            <div>
            <label for="password">Password: </label> <br />
            <input type="password" placeholder="Password" />
            <Button link= '/admin/updates' name= 'LOGIN'/>
            </div>
        </div>
      </div>
    );
  }
};


export default Login;