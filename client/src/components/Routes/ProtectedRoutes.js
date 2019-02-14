import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../Layout';
import NewUpdate from '../NewUpdate';
import Updates from '../UpdatesPage';
import Parks from '../ParksPage';
import Users from '../UsersPage';
import ProfilePage from '../ProfilePage';
import NoMatch from '../UI/NoMatch';

const ProtectedRoutes = ({ user }) => {
  return (
    <Layout user={user}>
      <Switch>
        <Route path="/admin/:id/newupdate" component={NewUpdate} />
        <Route path="/admin/:id/updates" component={Updates} />
        <Route path="/admin/:id/parks" component={Parks} />
        <Route path="/admin/:id/users" component={Users} />
        <Route path="/admin/:id/profile" component={ProfilePage} />
        <Route component={NoMatch} />
      </Switch>
    </Layout>
  );
};

export default ProtectedRoutes;
