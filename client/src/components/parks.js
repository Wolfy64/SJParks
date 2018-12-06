import React, { Component } from 'react'
import Todo from './todo';
import Items from './items';


export default class parks extends Component {
  inputElement = React.createRef(); // createRef? 
  constructor(props){ // and you can tell here that i added props to the component.
    super(props); // It it didn't have any before. 
    this.handleFilter = this.handleFilter.bind(this)
    this.state = {
      items: [],
      currentItem: {
        text: '',
        key: '',
      },
      parkFilter: '',
    }
  }

  handleFilter = e => {
    this.setState({
      parkFilter: e.target.value,
    })
    // When I press on the Keyboard, the whole app crashes. 
    // this.props.onChange(e.target.value)
    
    console.log(e)// It says that this is not a function.
  }

    handleInput = e => {
      const itemText = e.target.value; // Still Kinda Fuzzy About this Concept
      const currentItem = {text: itemText, key:Date.now() } // key is a key value pair from currentItem
      this.setState({
        currentItem,
        
      })
    }

     addItem = e => {
       e.preventDefault();
      const newItem = this.state.currentItem
      if (newItem.text !== ''){ // .text? is it a string method? if it is, what does it do?
        console.log(newItem)
        const items = [...this.state.items, newItem] // ... -> This is a Spread Operator but idk i don't understand the concept fully
        this.setState({
          items: items,
          currentItem: {text: '', key: ''},
        })  
      }
    }

     deleteItem = key => {
      const filteredItems = this.state.items.filter(item => { // i forgot what filter() does i need to reasearch this again. 
        return item.key !== key;
      })
      this.setState({
        items: filteredItems
      })
    }

<<<<<<< HEAD
    handleFilter = (e) => {
      e.preventDefault();  
      const filtered = this.state.items.filter(item=> item.text.includes('hi')); //needs to filter through items according to the inputed value instead of 'hi'
      this.setState({
        parkFilter: filtered
      })
    }

=======
  
>>>>>>> Help
     render(){
      return(
        <div>
          <h2>List</h2>
          <Todo
            addItem={this.addItem}
            inputElement={this.inputElement}
            handleInput={this.handleInput}
            currentItem={this.state.currentItem}
          />
<<<<<<< HEAD
=======
          <input  type="text" id="filter" value={this.state.parkFilter} onChange={this.handleFilter} placeholder="Search Parks.."/>
>>>>>>> Help
          <Items entries={this.state.items} deleteItem={this.deleteItem}/>
          
          <h2>Filter</h2>
          <form onSubmit={this.handleFilter}>
            <input value={this.state.text} type="text" id="filter" placeholder="Search Parks.."/>
            <button type="submit">Search</button>
          </form>
          <Items entries={this.state.parkFilter}/>
        </div>
      )
    }
}

// PLEASE LOOK AT THE COMMENTS ON MY CODE AND IF YOU CAN EXPLAIN TO ME ABOUT THESE CONCEPTS
// THANK YOU!!!




