<<<<<<< HEAD
import React from 'react';
import Router from './components/router';

class App extends React.Component {
  //Template router
  render() {
    return (
      <div>
        <Router />
      </div>
    );
  }
}

export default App;
=======
import React from 'react';
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
  state = { isConnected: false };

  render() {
    let routes = (
      <Switch>
        <Route path='/' component={PublicPage} exact />
        <Route path='/login' component={Login} />
        <Route component={NoMatch} />
      </Switch>
    );

    if (this.state.isConnected) {
      routes = (
        <Layout>
          <Switch>
            <Route path='/admin/newupdate' component={NewUpdate} />
            <Route path='/admin/updates' component={Updates} />
            <Route path='/admin/parks' component={Parks} />
            <Route path='/admin/users' component={Users} />
            <Route path='/admin/profile' component={ProfilePage} />
            <Route path='/' component={PublicPage} exact />
            <Route component={NoMatch} />
          </Switch>
        </Layout>
      );
    }

    return routes;
  }
}

export default App;
>>>>>>> master
