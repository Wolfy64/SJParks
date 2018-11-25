import React, { Component } from 'react'

export default class pList extends Component {
  render() {
    return (
      <div className='todoListMain'>
        <div className ='header'>
        <form onSubmit={this.props.addItem}>
        <input 
            name='newPark'
            placeholder="New Park..."
            value={this.props.newPark}
            onChange={this.props.handleInput}
            />
            <button type="submit">Add Park</button>        
        </form>
        </div>
        
      </div>
    )
  }
}
