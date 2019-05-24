import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import { withRouter } from "react-router";

import Home from './containers/Home'
import Login from './components/Login'
import NewAccount from './components/NewAccount'

function App() {
  return (
    <div>
      <header>
        <p>HOME PAGE</p>
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/newaccount" component={NewAccount} />
        </Router>
      </header>
    </div>
  );
}

export default App;
