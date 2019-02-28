import React from 'react';
import { Container } from './styles';
import UserLink from '../UserLink';
import NavBar from '../NavBar';

import ProtectedRoutes from '../Routes/ProtectedRoutes';

const Dashboard = ({ user }) => (
  <>
    <UserLink user={user} />
    <NavBar user={user} />
    <Container>
      <ProtectedRoutes user={user} />
    </Container>
  </>
);

export default Dashboard;
