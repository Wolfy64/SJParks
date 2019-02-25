import React from 'react';
import { Container } from './styles';
import Topnav from '../TopNav/TopNav';
import SideBar from '../SideBar';

import ProtectedRoutes from '../Routes/ProtectedRoutes';

const Dashboard = ({ user }) => (
  <>
    <Topnav user={user} />
    <SideBar user={user} />
    <Container>
      <ProtectedRoutes user={user} />
    </Container>
  </>
);

export default Dashboard;
