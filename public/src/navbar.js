import React from 'react';

const title = <h1>SJParks</h1>;

const type = <p>Admin</p>;

const logout = <p>Logout</p>;


class NavBar extends React.Component {
    render (){
        return (
    <nav>
        <ul>
            <li>{this.props.name}</li>
        </ul>
    </nav>
        );

    }
}

function adminTitle (props){
    render(){
        return title; 
    }
}

function typeOf (props){
    render (){
        return type;
    }
}

function logout (props){
    render (){
        return logout;
    }
}


