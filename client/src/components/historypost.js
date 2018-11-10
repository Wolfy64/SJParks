import React, { Component } from 'react'

class Post extends React.Component{
  render (){
    return (
      <div className="card">
        <div className="dark-blue white-text">
            <i>Arrow</i>
            <p>Jeff Tomson</p>
            <p>11/10/2018 at 11:54 AM</p>
        </div>
        <div className="gray bottom-round">
            <div className="parkID green-tag white-text">ROSE</div>
            <a className="blue-link">11 more...</a>
        </div>
        <p>Bramhall Park and Rose Garden, 
Dear resident, we recommend not visiting Rose Garden or Bramhall Park due to a fire in the Almaden area. We will update you as soon as it is safe to visit the park.</p>
      </div>
    );
  }
};


export default Login;