import React from 'react';
import styled from 'styled-components';
import Topnav from '../TopNav/TopNav';
import SideBar from '../SideBar';

const Page = styled.div`
  margin: 0 80px 0 240px;
  @media screen and (max-width: ${(props) => props.theme.displays.mobileL}) {
    margin: 50px 10px;
  }
`;

const Layout = ({ children }) => (
  <>
    <Topnav />
    <SideBar />
    <Page>{children}</Page>
  </>
);

export default Layout;
