import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Btn = styled.button`
    color: aliceblue;
    width: 100%;
    -webkit-appearance: none;
    background-color: transparent;
    border: none;
    padding: 10px;
    
    :hover {
        background-color: rgba(255, 255, 255, 0.1)
    }
`;

const NavButton = (props) => {
    if(props.to){
        return (
            <Link to={props.to}>
                <Btn type={props.type || 'button'}>{props.name}</Btn>
            </Link>
        )
    } else {
        return (
            <Btn type={props.type || 'button'}>{props.name || 'Unnamed'}</Btn>
        )
    }   
}

export default NavButton;