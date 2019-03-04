/*jshint esversion: 8 */
import styled from 'styled-components';

export const NavContainer = styled.div`
  border-right: solid 3px ${props => props.theme.colors.primary};
  position: fixed;
  top: 0;
  background: ${props =>
    props.isMobile ? 'transparent' : props.theme.colors.dark};
  width: ${props => (props.isMobile ? '100%' : '150px')};
  height: ${props => (props.isMobile ? 'auto%' : '100vh')};
  color: ${props => props.theme.colors.lightbg};
  z-index: 2;

  ul {
    margin-top: ${props => (props.show ? 'none' : '-400px')};
    padding-top: ${props => (props.show ? 'none' : '70px')};
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    transition: all 0.5s ease;
    border-bottom: solid 3px
      ${props => (props.isMobile ? props.theme.colors.primary : 'none')};
  }

  li:last-child {
    width: 100%;
    position: ${props => (props.isMobile ? 'relative' : 'absolute')};
    bottom: ${props => (props.isMobile ? '0px' : '10px')};
  }

  .link {
    display: block;
    text-decoration: none;
    font-size: 0.8rem;
    padding: ${props => (props.isMobile ? '22px 10px' : '10px')};
    text-align: ${props => (props.isMobile ? 'center' : 'left')};
    color: ${props => props.theme.colors.lightbg};
    background-color: ${props => props.theme.colors.dark};

    :hover {
      background-color: ${props => props.theme.colors.secondary};
    }
  }

  .logout {
    text-align: center;
  }

  .active {
    background-color: ${props => props.theme.colors.primary};
  }
`;
