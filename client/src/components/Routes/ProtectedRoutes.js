import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NewUpdatePage from '../NewUpdatePage';
import UpdatesPage from '../UpdatesPage';
import ParksPage from '../ParksPage';
import UsersPage from '../UsersPage';
import ProfilePage from '../ProfilePage';
import NoMatch from '../UI/NoMatch';

const ProtectedRoutes = ({ user }) => (
  <Switch>
    <Route
      path="/admin/:id/newupdate"
      component={() => <NewUpdatePage user={user} />}
    />
    <Route
      path="/admin/:id/updates"
      component={() => <UpdatesPage user={user} />}
    />
    <Route path="/admin/:id/parks" component={ParksPage} />
    <Route path="/admin/:id/users" component={UsersPage} />
    <Route path="/admin/:id/profile" component={ProfilePage} />
    <Route component={NoMatch} />
  </Switch>
);

export default ProtectedRoutes;
