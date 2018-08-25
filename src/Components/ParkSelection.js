import React, { Component } from 'react';
import Select from 'react-select';


class ParkSelectionField extends Component{
  constructor(props){
    super(props);
    this.state = {
      parkSelection: null,
      options: [
        {value: 1, label: 'San Jose Parks 1'},
        {value: 2, label: 'San Jose Parks 2'},
      ],
    }
    this.getValue = this.getValue.bind(this);
    this.setOptions = this.setOptions.bind(this);
  }

  setOptions(options){
    // This takes in a list as an input and sets the items of that list as
    // options of the menu.
    // To-Do: Error handling, only accept options
    this.setState({
      options: options,
    })
  }

  getValue(selection){
    // To Do: Error Handling
    this.setState({
      parkSelection: selection,},
      () => {
        console.log(this.state.parkSelection.value)
        // return this.state.parkSelection
      }
    );
  }

  render(){
    return(
      <div className="dropboxMenu">
        <Select
          value={this.state.parkSelection}
          onChange={this.getValue}
          options={this.state.options}
        />
      </div>
    )
  }
}

export default ParkSelectionField;
