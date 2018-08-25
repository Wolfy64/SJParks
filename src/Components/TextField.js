import React, { Component } from 'react';

class ParkProblemTextField extends Component{
  constructor(props){
    super(props);
    this.state = {
      textValue: null,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({
      textValue: event.target.value,
    },
      () => {console.log(this.state.textValue)}
    )
  }


  render(){
    return(
      <div className="parksComplaintTextBoz">
        <input
          type='text'
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default ParkProblemTextField;
