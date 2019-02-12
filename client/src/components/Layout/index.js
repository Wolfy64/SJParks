import React from 'react';
import styled from 'styled-components';
import Topnav from '../TopNav/TopNav';
import SideBar from '../SideBar';

const Page = styled.div`
  margin: 0 80px 0 240px;
  z-index: 0;
  @media screen and (max-width: ${(props) => props.theme.displays.tablet}) {
    margin: 100px 0;
  }
`;

const Layout = ({ children, user }) => (
  <>
    <Topnav user={ user } />
    <SideBar user={ user } />
    <Page>{children}</Page>
  </>
);

export default Layout;
