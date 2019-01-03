import React, { Component } from 'react'
import Button from './UI/Generic/Button'

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
            <Button name='Add Park' type="submit"/>
        </form>
        </div>
        
      </div>
    )
  }
}
