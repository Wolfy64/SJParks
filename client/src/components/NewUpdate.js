import React, { Component } from 'react'

export class newUpdate extends Component {
  constructor(props){ 
    super(props); 
    this.handleFilter = this.handleFilter.bind(this)
    this.state = {
        lists: [{text: "Municipal Rose Garden", key: "ROSE"}],
        filteredLists: [],
        selectedLists: [],
        filter: '',
    }
}

handleInput = e => { //generic handleInput handles the change for any input field using the name and the value properties.
  const {name, value} = e.target;
  console.log('name',name)
  console.log('value',value)
  this.setState({
      [name]: value
  });
}

handleFilter = e => {
  e.preventDefault();  
  const filtered = this.state.lists.filter(item=> {
      return item.text.includes(this.state.filter)
  });
  this.setState({
    filteredLists: filtered,
    filter: '',
  });
}
  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleFilter}>
            <input 
                name='filter'
                value={this.state.filter} 
                onChange={this.handleInput} 
                type="text" id="filter" placeholder="Search Parks.."/>
            <button type="submit">Search</button>
          </form>
          <button>Select All</button>
          <ul>
            {this.state.filteredLists.map((list, i) => <li key={i}>{list.text}</li>)}
          </ul>
        </div>

      </div>
    )
  }
}

export default newUpdate;
