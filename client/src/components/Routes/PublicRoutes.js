import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from '../HomePage';
import LoginPage from '../LoginPage';

const PublicRoutes = () => (
  <Switch>
    <Route path="/" component={HomePage} exact />
    <Route path="/login" component={LoginPage} />
    <Route component={() => <Redirect to="/login" />} />
  </Switch>
);

export default PublicRoutes;
