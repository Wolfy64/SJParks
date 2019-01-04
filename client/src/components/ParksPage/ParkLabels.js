<<<<<<< HEAD:client/src/components/parklabels.js
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
=======
import React, { Component } from 'react'

class Label extends React.Component{
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


export default Label;
>>>>>>> master:client/src/components/ParksPage/ParkLabels.js
