import React from 'react';
import styled from 'styled-components';
import Topnav from '../TopNav/TopNav';
import SideBar from '../SideBar';

const Page = styled.div`
  margin: 0 80px 0 240px;
  display: flex;
  flex-wrap: wrap;
  z-index: 1;
  @media screen and (max-width: ${(props) => props.theme.displays.tablet}) {
    margin: 100px 0;
    flex-direction: column;
    align-items: center;
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
