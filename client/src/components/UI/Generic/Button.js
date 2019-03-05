/*jshint esversion: 8 */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Btn = styled.button`
  background: ${props => props.delete ? "#750000" : "#004A75"};
  color: white;
  font-size: 1em;
  margin: 1em auto;
  padding: 0.25em 1em;
  border-radius: 7px;
  border: 1px solid ${props => props.delete ? "#580808" : "#083C5B"};
  width: 100%;
  height: 2em;
  max-width : 300px;
  :hover {
    background: white;
    color: ${props => props.delete ? "#580808" : "#083C5B"};
    cursor: pointer;
  }
`;

const Button = (props) => {
    if(!props.to){
        return <Btn {...props}>{props.name}</Btn>;
    } else {
        return(
            <Link style={{textDecoration:'none'}} to={props.to}>
                <Btn {...props}>{props.name}</Btn>
            </Link>
        );
    }
}
export default Button;