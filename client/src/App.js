<<<<<<< HEAD
import React from 'react';
import './App.css';
import Sidenav from './components/sidenav'
import Topnav from './components/topnav'
=======
import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Sidenav from './components/sidenav'

class App extends React.Component{
    //Template router
    render () {
        return(
        <div>
        <Sidenav />
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/topics">Topics</Link>
              </li>
            </ul>

            <hr />
>>>>>>> Router template set up

            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/topics" component={Topics} />
          </div>
        </Router>
        </div>
        )
    }
};

function Home() {
  return (
    <div>
<<<<<<< HEAD
        <Sidenav page="hi" />
        <div className="page">
        
            <Topnav />
            
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus leo mauris, placerat et pharetra in, auctor id diam. Curabitur mattis lacus id tellus varius, sit amet semper orci ultrices. Aenean ultricies nunc nec erat lacinia congue. Aenean nec enim consequat, tempus sapien id, tempus enim. Nam tincidunt aliquet tortor, ac sodales eros pretium vel. Pellentesque congue ex sed dui pharetra, nec dignissim diam dignissim. Duis vestibulum porttitor dolor, a porta orci cursus eget. Suspendisse eu justo sed sem lobortis molestie et nec lorem. Duis risus ante, rhoncus et felis sed, consectetur facilisis magna. Praesent eleifend turpis sit amet sem elementum, non ultricies sem lacinia. Vestibulum non porta enim, a consequat mauris.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus leo mauris, placerat et pharetra in, auctor id diam. Curabitur mattis lacus id tellus varius, sit amet semper orci ultrices. Aenean ultricies nunc nec erat lacinia congue. Aenean nec enim consequat, tempus sapien id, tempus enim. Nam tincidunt aliquet tortor, ac sodales eros pretium vel. Pellentesque congue ex sed dui pharetra, nec dignissim diam dignissim. Duis vestibulum porttitor dolor, a porta orci cursus eget. Suspendisse eu justo sed sem lobortis molestie et nec lorem. Duis risus ante, rhoncus et felis sed, consectetur facilisis magna. Praesent eleifend turpis sit amet sem elementum, non ultricies sem lacinia. Vestibulum non porta enim, a consequat mauris.</p>
        </div>
        
=======
      <h2>Home</h2>
>>>>>>> Router template set up
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
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


export default App;

