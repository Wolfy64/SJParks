/*jshint esversion: 8 */
import React from 'react';
import { withRouter } from 'react-router';
import PublicRoutes from './components/Routes/PublicRoutes';
import Dashboard from './components/Dashboard';
// import makeRequest from './utils/makeRequest';
// Test CI
class App extends React.Component {
  state = { isAuthenticated: false };

  // async componentDidMount() {
  //   const request = await makeRequest('/api/auth');
  //   const { success, payload } = await request.json();

  //   this.setState({
  //     isAuthenticated: success,
  //     user: payload
  //   });

  //   if (success) this.props.history.push(`/admin/${payload._id}/updates`);
  // }

  render() {
    const { isAuthenticated, user } = this.state;
    const Routes = isAuthenticated ? (
      <Dashboard user={user} />
    ) : (
      <PublicRoutes />
    );

    return Routes;
  }
}

export default withRouter(App);
