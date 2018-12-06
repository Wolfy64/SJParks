import React, { Component } from 'react';
import NavButton from './navbutton';
import './sidenav.css';
import Topnav from './topnav'
import Parks from './parks'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


export default class SideNav extends Component {
    
    render() {
    return (
      
          <Router>
              <div> 
                <Topnav />
                <div className="sidebar">
                  <div className="title text-center nav-item">
                      <h1>SJParks</h1>
                      <p>Admin</p>
                  </div>
                  <ul className="navbar-nav">
                    <li><Link to="/updates"><NavButton name="Updates" action="updatePage"/></Link></li>
                    <li><Link to="/parks"><NavButton name="Parks" action="parkPage"/></Link></li>
                    <li><Link to="/users"><NavButton name="Users" action="userPage" /></Link></li>
                  </ul>

                  <div className="logout">
                    <Link to="/"><NavButton name="Logout" action="logoutPage" /></Link>
                  </div>
                </div>
            <div className='page'>
              <Route path="/updates" component={Home} />
              <Route path="/parks" component={Parks} />
              <Route path="/users" component={Topics} />
              <Route path="/login" component={Topics} />
              </div>
            </div>
          </Router> 
      
    );
        
function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}



function Topics({ match }) {
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/rendering`}>Rendering with React</Link>
        </li>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:topicId`} component={Topic} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  );
}

function Topic({ match }) {
  return (
    <div>
      <h3>{match.params.topicId}</h3>
    </div>
  );
}
  }

}


