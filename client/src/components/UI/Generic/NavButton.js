import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Btn = styled.button`
    width: 100%;
    border: none;
    padding: 10px;
    color: ${props => props.theme.colors.lightbg};
    background-color: ${props => props.theme.colors.dark};
    :hover {
        background-color: rgba(255, 255, 255, 0.1)
    };
    @media screen and (max-width: ${(props) => props.theme.displays.mobileL}) {
        padding: 22px 10px;
    }
`;

class NavButton extends React.Component {
    state = {}
    render() {
        const props = this.props;
        
        if (props.to) {
            return (
                <Link to={props.to}>
                    <Btn 
                    onClick={()=>{
                        props.toggleActive(props.name)
                        this.setState({
                            props
                        })
                    }}
                    className={props.active===props.name
                        ? 'active' 
                        : null
                    }
                    type={props.type || 'button'}>{props.name}</Btn>
                </Link>
            );
        } else {
            return (
                <Btn onClick={props.onClick} type={props.type || 'button'}>{props.name || 'Unnamed'}</Btn>
            );
        }
    }  
}
export default NavButton;