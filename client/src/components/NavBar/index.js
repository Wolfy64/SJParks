import React from 'react';
import Title from './Title';
import BurgerIcon from './BurgerIcon';
import NavButton from '../UI/Generic/NavButton';
import makeRequest from '../../utils/makeRequest';
import { NavContainer } from './styles';

import { NavLink } from 'react-router-dom';

class NavBar extends React.Component {
  state = {
    isMobile: false,
    show: true
  };

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize = () => this.setState({ isMobile: window.innerWidth < 768 });

  logout = async () => {
    const request = await makeRequest('/logout');
    if (request.status === 200) window.location.replace('/login');
  };

  toggle = () => this.setState({ show: !this.state.show });

  render() {
    const { isMobile, show } = this.state;
    const { user } = this.props;
    const url = `/admin/${user._id}`;

    return (
      <NavContainer isMobile={isMobile} show={show}>
        {isMobile ? (
          <BurgerIcon open={!show} toggle={this.toggle} />
        ) : (
          <Title />
        )}

        <ul>
          <li>
            <NavLink className="link" to={`${url}/updates`}>
              Updates
            </NavLink>
          </li>
          <li>
            <NavLink className="link" to={`${url}/parks`}>
              Parks
            </NavLink>
          </li>
          <li>
            <NavLink className="link" to={`${url}/users`}>
              Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className="link logout" onClick={this.logout}>
              Logout
            </NavLink>
          </li>
        </ul>
      </NavContainer>
    );
  }
}

export default NavBar;
