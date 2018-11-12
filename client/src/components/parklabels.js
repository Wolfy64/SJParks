import React, { Component } from 'react'

class Post extends React.Component{
  render (){
    return (
        <div className="green white-text">
        {this.props.results.map((e)=>{
        <p>{e}</p>})
    }
      </div>
    );
  }
};


export default Login;