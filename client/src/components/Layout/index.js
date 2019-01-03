import React from 'react';
import Topnav from '../TopNav/TopNav';
import SideBar from '../SideBar';

const Layout = ({ children }) => (
  <>
    <Topnav />
    <SideBar />
    <div className='page'>{children}</div>
  </>
);

export default Layout;
