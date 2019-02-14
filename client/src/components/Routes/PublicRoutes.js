import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PublicPage from '../PublicPage';
import Login from '../LoginPage';
import NoMatch from '../UI/NoMatch';

const PublicRoutes = () => (
  <Switch>
    <Route path="/" component={PublicPage} exact />
    <Route path="/login" component={Login} />
    <Route component={NoMatch} />
  </Switch>
);

export default PublicRoutes;
