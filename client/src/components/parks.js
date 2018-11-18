import React, { Component } from 'react'


export default class parks extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: [],
      currentItem: {text: '', key: ''},
    }
    handleInput = e => {
      //....
    }

    addItem = e => {
      //....
    }
     render(){
       return(
         <div>
           <h1>Parks</h1>
         </div>
       )
     }
  }
}



export default class parks extends Component {
  constructor(props){
    super(props);
    this.handleFilter = this.handleFilter.bind(this);
    this.state = {
      parkFilter: ''
    }
  }

  handleFilter = (e) => {
    this.setState({
      parkFilter: e.target.value
    })
    this.props.onChange(e.target.value) 
  }

  render() {
    return (
      <div>
        <h1>Parks</h1>
        <div className="form-group">
            <label htmlFor="username">New Parks Title: </label> <br />
            <input type="name" name="name" placeholder="Parks" />
        </div>
        <div className="form-group">
            <label htmlFor="username">Keyword </label> <br />
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





