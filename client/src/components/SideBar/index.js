import React from 'react';
import styled from 'styled-components';
import NavButton from '../UI/Generic/NavButton';

const SideNav = styled.div`
  border-right: solid 3px ${props=>props.theme.colors.primary};
  position: fixed;
<<<<<<< HEAD
  top:0;
  background: #212529;
=======
  top: 0;
  background: ${props=>props.theme.colors.dark};
>>>>>>> eaef81a2e80adcbf94a698067c4206b063585bb7
  width: 150px;
  height: 100vh;
  color: ${props=>props.theme.colors.lightbg};

<<<<<<< HEAD
  .logout{
  position: absolute;
  bottom: 10px;
  width: inherit;
  }
  .title{
  color: aliceblue;
  padding-top: 10px;
  }
  @media (max-width: 768px) {
  .title h1{
      font-size: 20px;
=======
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
>>>>>>> eaef81a2e80adcbf94a698067c4206b063585bb7
  }
`

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
      <NavButton to='/' name='Logout' action='logoutPage' />
    </div>
  </SideNav>
);

export default SideBar;
