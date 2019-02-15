import React from 'react';
import PublicRoutes from './components/Routes/PublicRoutes';
import ProtectedRoutes from './components/Routes/ProtectedRoutes';
import makeRequest from './utils/makeRequest';

import { withRouter } from 'react-router';

class App extends React.Component {
  state = { isAuthenticated: false };

  async componentDidMount() {
    const request = await makeRequest('/api/');
    const { isAuthenticated, user } = await request.json();

    this.setState({ isAuthenticated, user });

    if (user) this.props.history.push(`/admin/${user._id}/updates`);
  }

  render() {
    const { isAuthenticated, user } = this.state;
    const Routes = isAuthenticated ? (
      <ProtectedRoutes user={user} />
    ) : (
      <PublicRoutes />
    );
    return Routes;
  }
}

export default withRouter(App);
