import React from 'react';
import './App.css';


class updatePreview extends React.Component{
  render (){
    return (
      <div>
        <div>
          <p>{this.props.name}</p>
          <p>{this.props.time}</p>
        </div>
        <p>{this.props.update}</p>
        <a href="#">See More</a>
      </div>
    );
  }
};

function SeeFullHistory(props){
  render (){
    return <button>{this.props.name}</button>;
  };
}

function title(props){
  render () {
    return (
      <div>
        <h1>Latest Updates</h1>
      </div>
    );
  }
};

function textupdate(props){
  render (){
    return (
        <button>{this.props.name}</button>
    );
  }
}



export default App;
