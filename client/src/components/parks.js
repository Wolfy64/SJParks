import React, { Component } from 'react'

export default class parks extends Component {
  constructor(props){
    super(props);
    this.handleFilter = this.handleFilter.bind(this);
    this.state = {
      parkFilter: ''
    }
  }

  handleFilter = (e) =>{
    this.setState({
      parkFilter: e.target.value
    })
    this.props.onChange(event.target.value) 
  }

  render() {
    return (
      <div>
        <h1>Parks</h1>
        <div class="form-group">
            <label for="username">New Parks Title: </label> <br />
            <input type="name" name="name" placeholder="Parks" />
        </div>
        <div class="form-group">
            <label for="username">Keyword </label> <br />
            <input type="name" name="name" placeholder="Keyword" />
        </div>
        <button>Create New Park</button>
        <input type="name" id="filter" 
        value= {this.state.parkFilter}
        onChange={this.handleFilter}
        placeholder="search park by name"/>
      </div>
    )
  }
}





