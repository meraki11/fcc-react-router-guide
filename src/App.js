//https://www.freecodecamp.org/news/a-complete-beginners-guide-to-react-router-include-router-hooks/#setting-up-the-project
//coding examples

import React from 'react';
import "./index.css"

import { BrowserRouter as Router, Route, Link, Switch, Redirect, useHistory, useParams, useLocation } from "react-router-dom";

export default function App() {
  const name = "John Doe"
  const isAuthenticated = false
  return (
    <Router>
      <main>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to={`/about/${name}`}>About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

      {/* using render  */}
      {/* <Route path="/" render={() => <h1>Welcome!</h1>} /> */}

      {/* using component instead of render */}
      <Switch>
        <Route path="/" exact component={Home} />
        { 
        isAuthenticated ?
        
        <>
        <Route path="/about/:name" component={About} />
        <Route path="/contact" component={Contact} />
        <Route render={() => <h1>404: page not found</h1>} />
        </> : <Redirect to='/' />
        }

      </Switch>
      </main>
    </Router>
  );
}
//Home page
const Home = () => (
  <>
    <h1>Home</h1>
    <FakeText />
  </>
);
//About page
const About = () => {
  const { name } = useParams()
  //props.match.params.name is the same as ({match:{params:{name}}})
  return (
  <>
    { name !== 'John Doe' ? <Redirect to="/" /> : null }
    <h1>About {name}</h1>
    <Route component={Contact} />
  </>
  )
};
//Contact page
const Contact = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  return (
  <>
    <h1>Contact</h1>
    <p>Current URL: {pathname}</p>
    <button onClick={() => history.push('/') } >Go to home</button>
  </>
  )
};

const FakeText = () => (
  /* cSpell:disable */
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
  </p>
  /* cSpell:enable */
)

