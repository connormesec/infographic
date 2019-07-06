import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Usage from './Usage';
import About from './About';
import Contact from './Contact';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

const routing = (
    <Router>
      <div className="navbarWrapper">
      <div className="navbar">
        <ul className="nav-tabs">
          <div className="logo"><p id="logo">| ACHA INFOGRAPHIC GENERATOR |</p></div>
          <li className="navList">
            <Link className="nav" to="/">Home</Link>
          </li>
          <li className="navList">
            <Link className="nav" to="/howToUse">How To Use</Link>
          </li>
          <li className="navList">
            <Link className="nav" to="/about">About</Link>
          </li>
          <li className="navList">
            <Link className="nav" to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      </div>
      <Route exact path="/" component={App} />
      <Route path="/howToUse" component={Usage} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
