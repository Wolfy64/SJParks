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

  .logout {
    position: absolute;
    bottom: 10px;
    width: 100%;
    @media screen and (max-width: ${props => props.theme.displays.mobileL}) {
      position: relative;
      bottom: 0px;
    }
  }

  .title {
    text-align: center;
    margin: 1rem 0;
    h1 {
      font-size: 1.8em;
      margin-bottom: 0.3rem;
    }
  }

  .menuIcon {
    display: none;
    text-align: center;
    margin: 10px 0;
    @media screen and (max-width: ${props => props.theme.displays.mobileL}) {
      display: block;
    }
  }
  @media screen and (max-width: ${props => props.theme.displays.mobileL}) {
    .navbar-nav {
      margin-top: -200px;
    }
  }
  @media screen and (max-width: ${props => props.theme.displays.mobileL}) {
    width: 100%;
    height: auto;
  }
`;

export default class SideBar extends React.Component {
  state = {
    menuIcon: 'fa fa-bars'
  };
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({
        userID: jwt_decode(token).user._id
      });
    }
  }

  logout = () => {
    localStorage.removeItem('token');
    window.location.replace('/login');
  };

  toggleMenu = () => {
    if (this.state.menuIcon === 'fa fa-bars') {
      this.setState({ menuIcon: 'fa fa-times' });
    } else {
      this.setState({ menuIcon: 'fa fa-bars' });
    }
  };
  render() {
    return (
      <SideNav>
        <div className="title">
          <h1>SJParks</h1>
          <p>Admin</p>
        </div>
        <div className="menuIcon">
          <i className={this.state.menuIcon} onClick={this.toggleMenu} />
        </div>
        <div className="navbar-nav">
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
      </SideNav>
    );
  }
}
