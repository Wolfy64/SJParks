import React from 'react';
import styled from 'styled-components';
import Topnav from '../TopNav/TopNav';
import SideBar from '../SideBar';

const Page = styled.div`
  padding: 0 20px 0 170px;
`;

const Layout = ({ children }) => (
  <>
    <Topnav />
    <SideBar />
    <Page>{children}</Page>
  </>
);

export default Layout;
