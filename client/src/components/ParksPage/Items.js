import React, { Component } from 'react'

export default class Items extends Component {
    createItems = item => {
        return (
            <li key={item.key} onClick={() => this.props.deleteItem(item.key)}>
            {item.text}
            </li>
        )
    }

    render(){
        const listEntries = this.props.entries;
        const listItems = listEntries.map(this.createItems);

        return <ul>{listItems}</ul>
    }
}
