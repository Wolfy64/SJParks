import React from 'react';
import styled from 'styled-components';
import NavButton from '../UI/Generic/NavButton';

const SideNav = styled.div`
  border-right: solid 3px darkblue;
  position: fixed;
  top: 0;
  background: #212529;
  width: 150px;
  height: 100vh;

  .logout {
    position: absolute;
    bottom: 10px;
    width: inherit;
  }

  .title {
    color: aliceblue;
    padding-top: 10px;
  }

  @media (max-width: 768px) {
    .title h1 {
      font-size: 20px;
    }
  }
`;

const SideBar = () => (
  <SideNav>
    <div className='title text-center nav-item'>
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
