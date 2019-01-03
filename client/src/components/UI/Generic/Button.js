import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Btn = styled.button`
  background: ${props => props.delete ? "#750000" : "#004A75"};
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 7px;
  border: none;
  width : 100%;
  :hover {
    border: 1px solid ${props => props.delete ? "#580808" : "#083C5B"};
    background: white;
    color: ${props => props.delete ? "#580808" : "#083C5B"};
  }
`;

const Button = (props) => {
    if(!props.link){
        return <Btn {...props}>{props.name}</Btn>;
    } else {
    return(
        <div>
            <Link to={props.link}>
                <Btn {...props}>{props.name}</Btn>
            </Link>
        </div>
    );
    }
}
export default Button;