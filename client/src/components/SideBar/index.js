import React from 'react';
import jwt_decode from 'jwt-decode';
import styled from 'styled-components';
import NavButton from '../UI/Generic/NavButton';

const SideNav = styled.div`
  border-right: solid 3px ${props => props.theme.colors.primary};
  position: fixed;
  top: 0;
  background: ${props => props.theme.colors.dark};
  width: 150px;
  height: 100vh;
  color: ${props => props.theme.colors.lightbg};
  z-index: 3;
  @media screen and (max-width: ${(props) => props.theme.displays.tablet}) {
    width: 100%;
    height: auto;
    background-color: transparent;
    #navbar{
      margin-top: -400px;
      padding-top: 70px;
      -webkit-transition: all 0.5s ease;
      -moz-transition: all 0.5s ease;
      transition: all 0.5s ease;
      background: ${props => props.theme.colors.dark};
      border-bottom: solid 3px ${props => props.theme.colors.primary};
    }
  };

  .logout {
    position: absolute;
    bottom: 10px;
    width: 100%;
    @media screen and (max-width: ${props => props.theme.displays.tablet}) {
      position: relative;
      bottom: 0px;
    }
  };

  .title {
    text-align: center;
    margin: 1rem 0;
    background: ${props => props.theme.colors.dark};
    h1 {
      font-size: 1.8em;
      margin-bottom: 0.3rem;
    };
    @media screen and (max-width: ${(props) => props.theme.displays.tablet}) {
      display: none;
    }
  }

  .menuIcon {
    display: none;
    height: 20px;
    width: 30px;
    padding: 40px 20px;
    position: fixed;
    right: 0px;
    justify-content: center;
    @media screen and (max-width: ${(props) => props.theme.displays.tablet}) {
      display: block;
    }
  }

  #hid{
    height: 100vh;
    width: 100%;
    background-color: transparent;
    display: none;
  }
`;
function openNav() {
  document.getElementById("navbar").style.marginTop = "0px";
  document.getElementById("hid").style.display = "block";
}

function closeNav() {
  document.getElementById("navbar").style.marginTop = "-400px";
  document.getElementById("hid").style.display = "none";
}
export default class SideBar extends React.Component {
  
  state = {
    menuIcon: 'fa fa-bars',
    menu: false
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({
        userID: jwt_decode(token).user._id
      });
    }
  };

  logout = () => {
    localStorage.removeItem('token');
    window.location.replace('/login');
  };

  toggleMenu = () => {
    if(this.state.menuIcon === 'fa fa-bars'){
      openNav()
      this.setState({
        menuIcon: 'fa fa-times',
        menu: true
      })
    } else {
      closeNav()
      this.setState({
        menuIcon: 'fa fa-bars',
        menu: false
      })
    }
  };

  render() {
    return (

      <SideNav>
        <div className="title">
          <h1>SJParks</h1>
          <p>Admin</p>
        </div>
        <div className='menuIcon' onClick={this.toggleMenu}>
          <i className={this.state.menuIcon}/>
        </div>

        <div id="navbar">
          <ul>
            <li>
              <NavButton
                to={`/admin/${this.state.userID}/updates`}
                name="Updates"
                action="updatePage"
              />
            </li>
            <li>
              <NavButton
                to={`/admin/${this.state.userID}/parks`}
                name="Parks"
                action="parkPage"
              />
            </li>
            <li>
              <NavButton
                to={`/admin/${this.state.userID}/users`}
                name="Users"
                action="userPage"
              />
            </li>
          </ul>
          
          <div className="logout">
            <NavButton
              onClick={this.logout}
              type="submit"
              name="Logout"
              action="logoutPage"
            />
          </div>
        </div>
        <div id="hid" onClick={this.toggleMenu}></div>
      </SideNav>
    );
  }
}
