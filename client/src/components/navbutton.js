import React, { Component } from 'react'
import './navbutton.css';

export default class navButton extends Component {
  render() {
    return (
        <button className="nav-btn">{this.props.name}</button>
    )
  }
}
