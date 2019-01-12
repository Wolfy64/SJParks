import React from 'react';
import styled from 'styled-components';
import NavButton from '../UI/Generic/NavButton';

const SideNav = styled.div`
  border-right: solid 3px ${props=>props.theme.colors.primary};
  position: fixed;
  top: 0;
  background: ${props=>props.theme.colors.dark};
  width: 150px;
  height: 100vh;
  color: ${props=>props.theme.colors.lightbg};

  .logout {
    position: absolute;
    bottom: 10px;
    width: inherit;
  };

  .title {
    text-align: center;
    margin: 1rem 0;
    h1 {
      font-size: 1.8em;
      margin-bottom: 0.3rem;
    };
  };
  }
`;

const SideBar = () => (
  <SideNav>
    <div className='title'>
      <h1>SJParks</h1>
      <p>Admin</p>
    </div>
    <ul className='navbar-nav'>
      <li>
        <NavButton to='/admin/updates' name='Updates' action='updatePage' />
      </li>
      <li>
        <NavButton to='/admin/parks' name='Parks' action='parkPage' />
      </li>
      <li>
        <NavButton to='/admin/users' name='Users' action='userPage' />
      </li>
    </ul>

    <div className='logout'>
      <form action="/login/out" method="POST">
        <NavButton type='submit' name='Logout' action='logoutPage' />
      </form>
    </div>
  </SideNav>
);

export default SideBar;
