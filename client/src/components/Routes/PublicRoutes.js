import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PublicPage from "../PublicPage";
import Login from "../LoginPage";

const PublicRoutes = () => (
  <Switch>
    <Route path="/" component={PublicPage} exact />
    <Route path="/login" component={Login} />
    <Route component={() => <Redirect to="/login" />} />
  </Switch>
);

export default PublicRoutes;
