import React from 'react';
import Parks from './components/parks';
import Users from './components/Users';
import Updates from './components/updates';
import NewUpdate from './components/NewUpdate';
import ProfilePage from './components/ProfilePage';
import PublicPage from './components/PublicPage';
import { Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';

class App extends React.Component {
  state = { isConnected: true };

  render() {
    let routes = (
      <Switch>
        <Route path='/' component={PublicPage} exact />
        <Route component={() => <h1>ERROR 404</h1>} />
      </Switch>
    );

    if (this.state.isConnected) {
      routes = (
        <Switch>
          <Layout>
            <Route path='/admin/newupdate' component={NewUpdate} />
            <Route path='/admin/updates' component={Updates} />
            <Route path='/admin/parks' component={Parks} />
            <Route path='/admin/users' component={Users} />
            <Route path='/admin/profile' component={ProfilePage} />
            <Route component={() => <h1>ERROR 404</h1>} />
          </Layout>
        </Switch>
      );
    }

    return routes;
  }
}

export default App;
