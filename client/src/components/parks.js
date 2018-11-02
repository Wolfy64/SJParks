import React, { Component } from 'react'

export default class parks extends Component {
  render() {
    return (
      <div>
        <h1>Parks</h1>
        <div class="form-group">
            <label for="username">New Park's Title: </label> <br />
            <input type="name" name="name" placeholder="Parks" />
        </div>
        <div class="form-group">
            <label for="username">Keyword </label> <br />
            <input type="name" name="name" placeholder="Keyword" />
        </div>
        <button>Create New Park</button>
      </div>
    )
  }
}
