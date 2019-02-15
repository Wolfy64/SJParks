import React from 'react';
import PublicRoutes from './components/Routes/PublicRoutes';
import ProtectedRoutes from './components/Routes/ProtectedRoutes';
import makeRequest from './utils/makeRequest';
import { withRouter } from 'react-router';

class App extends React.Component {
  state = { isAuthenticated: false };

  async componentDidMount() {
    await makeRequest('/api/auth')
      .then(res => res.json())
      .then(token => {
        console.log('[App.js] auth', token.auth)
        const { isAuthenticated, user } = token.auth;
        this.setState({ isAuthenticated, user});
        if (user) this.props.history.push(`/admin/${user._id}/updates`);
      })
      .catch(err => err)
  }

  render() {
    const { isAuthenticated, user } = this.state;
    const Routes = isAuthenticated ? (
      <ProtectedRoutes data={user}/>
    ) : (
      <PublicRoutes />
    );
    return Routes;
  }
}

export default withRouter(App);
