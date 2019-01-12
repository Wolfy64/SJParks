import React from 'react';
import styled from 'styled-components';
import Topnav from '../TopNav/TopNav';
import SideBar from '../SideBar';

const Page = styled.div`
  margin: 0 80px 0 240px;
`;

const Layout = ({ children }) => (
  <>
    <Topnav />
    <SideBar />
    <Page>{children}</Page>
  </>
);

export default Layout;
