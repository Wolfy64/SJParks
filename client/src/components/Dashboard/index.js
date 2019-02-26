import React from 'react';
import { Container } from './styles';
import UserLink from '../UserLink';
import SideBar from '../SideBar';

import ProtectedRoutes from '../Routes/ProtectedRoutes';

const Dashboard = ({ user }) => (
  <>
    <UserLink user={user} />
    {/* <TopBar user={user} /> */}
    <SideBar user={user} />
    <Container>
      <ProtectedRoutes user={user} />
    </Container>
  </>
);

export default Dashboard;
