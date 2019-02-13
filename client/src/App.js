import React from 'react';
import jwt from 'jsonwebtoken';
import Cookies from 'universal-cookie';
import Parks from './components/ParksPage';
import Users from './components/UsersPage';
import Updates from './components/UpdatesPage';
import NewUpdate from './components/NewUpdate';
import ProfilePage from './components/ProfilePage';
import PublicPage from './components/PublicPage';
import NoMatch from './components/UI/NoMatch';
import Login from './components/LoginPage';
import { Route, Redirect, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import makeRequest from './utils/makeRequest';

class App extends React.Component {
  state = { isAdmin: false };

  // async componentDidMount() {
  //   const request = await makeRequest('/auth', 'GET');
  //   const user = await request.json();

  //   if (user._id) this.setState({ isAdmin: true, user });
  // }

  render() {
    const { isAdmin, user } = this.state;
    console.log(user);

    let routes = (
      <Switch>
        <Route path="/" component={PublicPage} exact />
        <Route path="/login" component={Login} />
        <Route component={NoMatch} />
      </Switch>
    );

    if (isAdmin) {
      routes = (
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
    }

    return (
      <>
        {user && <Redirect to={`/admin/${user._id}/updates`} />}
        {routes}
      </>
    );
  }
}

export default App;
