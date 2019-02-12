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
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';

class App extends React.Component {
  state = { isAdmin: false };

  componentDidMount() {
    const cookie = new Cookies()
    let token = cookie.get('token');
    if (token) {
      token = jwt.decode(token);
      this.setState({ 
        token,
        isAdmin: true 
      });
    }
  }

  render() {
    const { isAdmin, token } = this.state;

    let routes = (
      <Switch>
        <Route path="/" component={PublicPage} exact />
        <Route path="/login" component={Login} />
        <Route component={NoMatch} />
      </Switch>
    );

    if (isAdmin) {
      routes = (
        <Layout user={token}>
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

    return routes;
  }
}

export default App;
