import React from 'react';
import Parks from './components/parks';
import Users from './components/Users';
import Updates from './components/updates';
import NewUpdate from './components/NewUpdate';
import ProfilePage from './components/ProfilePage';
import PublicPage from './components/PublicPage';
import NoMatch from './components/UI/NoMatch';
import { Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';

class App extends React.Component {
  state = { isConnected: true };

  render() {
    let routes = (
      <Switch>
        <Route path='/' component={PublicPage} exact />
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
