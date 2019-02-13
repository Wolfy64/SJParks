import React from 'react';
import Cookie from 'universal-cookie';
import { Consumer } from '../../utils/Context';
import NavButton from '../UI/Generic/NavButton';
import makeRequest from '../../utils/makeRequest';
import { NavContainer } from './styles';

function openNav() {
  document.getElementById('navbar').style.marginTop = '0px';
  document.getElementById('hid').style.display = 'block';
}

function closeNav() {
  document.getElementById('navbar').style.marginTop = '-400px';
  document.getElementById('hid').style.display = 'none';
}

export default class SideBar extends React.Component {
  state = {
    menuIcon: 'fa fa-bars',
    menu: false
  };

  logout = async () => {
    const request = await makeRequest('/logout', 'GET');
    const response = await request.json();
    console.log('TCL: SideBar -> logout -> response', response);
    // const cookie = new Cookie();
    // cookie.remove('token');
    // window.location.replace('/login');
  };

  toggleMenu = () => {
    if (this.state.menuIcon === 'fa fa-bars') {
      openNav();
      this.setState({
        menuIcon: 'fa fa-times',
        menu: true
      });
    } else {
      closeNav();
      this.setState({
        menuIcon: 'fa fa-bars',
        menu: false
      });
    }
  };

  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <NavContainer>
        <div className="title">
          <h1>SJParks</h1>
          <p>Admin</p>
        </div>
        <div className="menuIcon" onClick={this.toggleMenu}>
          <i className={this.state.menuIcon} />
        </div>

          <div id="navbar">
            <ul>
              <li>
                <NavButton
                  to={`/admin/${user._id}/updates`}
                  name="Updates"
                  action="updatePage"
                />
              </li>
              <li>
                <NavButton
                  to={`/admin/${user._id}/parks`}
                  name="Parks"
                  action="parkPage"
                />
              </li>
              <li>
                <NavButton
                  to={`/admin/${user._id}/users`}
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
        <div id="hid" onClick={this.toggleMenu} />
      </NavContainer>
    );
  }
}
