import React from 'react';
import './topnav.css';

class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'users'
    };

    this.toUsers = this.toUsers.bind(this);
  }

  toUsers(e) {
    alert('This buttons goes to users');
    e.preventDefault();
  }
  render() {
    return (
      <div className='top-nav'>
        <nav className='navbar'>
          <li>
            <Link to='/users' onClick={this.toUsers}>
              <img />IMAGE
            </Link>
          </li>
        </nav>
      </div>
    );
  }
}

export default TopNav;
