import React, { Component } from 'react'

export default class navButton extends Component {
  render() {
    return (
      <div>
        <button className="btn">{this.props.name}</button>
      </div>
    )
  }
}
