import React, { Component } from 'react'

export default class userInput extends Component {
  render() {
    return (
        <div>
            <h1>USERS</h1>
            <form>
                Full Name:
                <input text="name" name="name" />
                User ID:
                <input text="name" name="name" />
                Email:
                <input text="email" name="email" />
                Password:
                <input text="password" id="password" name="password" />
                Confirm Password:
                <input text="password" id="password" name="password" />
            </form>
            <form>
                Access Type:
                <select>
                    <option value="updates">Updates Only</option>
                    <option value="premium">Premiun Access</option>
                </select>
                <button>Create New User</button>
            </form>
        </div>
    )
  }
}
