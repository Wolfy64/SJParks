import React, { Component } from 'react'

export default class Todo extends Component {
    componentDidUpdate(){
        this.props.inputElement.current.focus();
    }
  render() {
    return (
      <div className='todoListMain'>
        <div className ='header'>
        <form onSubmit={this.props.addItem}>
        <input 
            placeholder="New Park..."
            ref={this.props.inputElement}
            value={this.props.currentItem.text}
            onChange={this.props.handleInput}
            />
            <button type="submit">Add Park</button>        
        </form>
        </div>
        
      </div>
    )
  }
}
