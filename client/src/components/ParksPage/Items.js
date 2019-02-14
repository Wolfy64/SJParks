import React, { Component } from 'react'

export default class Items extends Component {
    createItems = item => {
        return (
            <li key={item.code} onClick={() => this.props.deleteItem(item.code)}>
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
