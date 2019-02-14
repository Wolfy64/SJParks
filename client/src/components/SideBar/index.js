import React from 'react';
import Cookie from 'universal-cookie';
import { Consumer } from '../../utils/Context';
import NavButton from '../UI/Generic/NavButton';
import { NavContainer } from './styles';

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
    menu: false,
    active: 'Updates'
  };

  logout = () => {
    const cookie = new Cookie()
    cookie.remove('token');
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

  toggleActive = (name) => {
    console.log('[SideBar] toggleActive', name)
    this.setState (
      {
        active: {name}
      }
    )
  }

  render() {
    const {active, menuIcon} = this.state;
    return (
      <Consumer> 
      {user => (
        <NavContainer>
          <div className="title">
            <h1>SJParks</h1>
            <p>Admin</p>
          </div>
          <div className='menuIcon' onClick={this.toggleMenu}>
            <i className={menuIcon}/>
          </div>

          <div id="navbar">
            <ul>
              <li>
                <NavButton
                  to={`/admin/${user._id}/updates`}
                  name="Updates"
                  action="updatePage"
                  active={active}
                  toggleActive={this.toggleActive}
                />
              </li>
              <li>
                <NavButton
                  to={`/admin/${user._id}/parks`}
                  name="Parks"
                  action="parkPage"
                  active={active}
                  toggleActive={this.toggleActive}
                />
              </li>
              <li>
                <NavButton
                  to={`/admin/${user._id}/users`}
                  name="Users"
                  action="userPage"
                  active={active}
                  toggleActive={this.toggleActive}
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
        </NavContainer>
      )}
      </Consumer>
    );
  }
}
