import React from 'react';
import styled from 'styled-components';
import Topnav from '../TopNav/TopNav';
import SideBar from '../SideBar';
import AppProvider from '../../utils/AppProvider';

const Page = styled.div`
  margin: 0 80px 0 240px;
  display: flex;
  flex-wrap: wrap;
  z-index: 0;
  @media screen and (max-width: ${props => props.theme.displays.tablet}) {
    margin: 100px 0;
  }
`;

const Layout = ({ children, data }) => (
  <AppProvider data={data}>
    <Topnav />
    <SideBar />
    <Page>{children}</Page>
  </AppProvider>
);

export default Layout;
