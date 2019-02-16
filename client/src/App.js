import React from 'react';
import { withRouter } from 'react-router';
import PublicRoutes from './components/Routes/PublicRoutes';
import ProtectedRoutes from './components/Routes/ProtectedRoutes';
import makeRequest from './utils/makeRequest';

class App extends React.Component {
  state = { isAuthenticated: false };

  async componentDidMount() {
    const request = await makeRequest('/api/auth');
    const { success, user } = await request.json();

    this.setState({ isAuthenticated: success, user });

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
