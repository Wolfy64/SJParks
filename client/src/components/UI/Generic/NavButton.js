import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Btn = styled.button`
    width: 100%;
    background-color: transparent;
    border: none;
    padding: 10px;
    color: ${props=>props.theme.colors.lightbg};
    :hover {
        background-color: rgba(255, 255, 255, 0.1)
    }
    @media screen and (max-width: ${(props) => props.theme.displays.mobileL}) {
        padding: 22px 10px;
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
            <Btn onClick={props.onClick} type={props.type || 'button'}>{props.name || 'Unnamed'}</Btn>
        )
    }   
}

export default NavButton;