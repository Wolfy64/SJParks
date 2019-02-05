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
    width: inherit;
  }
  .title {
    text-align: center;
    margin: 1rem 0;
    background: ${props => props.theme.colors.dark};
    h1 {
      font-size: 1.8em;
      margin-bottom: 0.3rem;
    }
  }
`;
function openNav() {
  document.getElementById("navbar").style.marginTop = "0px";
  document.getElementById("hid").style.display = "block";
}

const SideBar = () => {
  let token = localStorage.getItem('token');
  const userID = jwt_decode(token).user._id;
  const logout = () => {
    localStorage.removeItem('token');
    token = localStorage.getItem('token');
    window.location.replace('/login');
  }

  return (
    <SideNav>
      <div className="title">
        <h1>SJParks</h1>
        <p>Admin</p>
      </div>
      <ul className="navbar-nav">
        <li>
          <NavButton
            to={`/admin/${userID}/updates`}
            name="Updates"
            action="updatePage"
          />
        </li>
        <li>
          <NavButton
            to={`/admin/${userID}/parks`}
            name="Parks"
            action="parkPage"
          />
        </li>
        <li>
          <NavButton
            to={`/admin/${userID}/users`}
            name="Users"
            action="userPage"
          />
        </li>
      </ul>

      <div className="logout">
        <NavButton onClick={logout} type="submit" name="Logout" action="logoutPage" />
      </div>
    </SideNav>
  );
};

export default SideBar;
