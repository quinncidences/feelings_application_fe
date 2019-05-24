import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import { withRouter } from "react-router";

import Home from './containers/Home'
import Login from './components/Login'
import NewAccount from './components/NewAccount'
import NewPost from './components/NewPost'
import Post from './components/Post'

function App() {
  return (
    <div>
      <header>
        <p>HOME PAGE</p>
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/newaccount" component={NewAccount} />
          {/* I want this to show up without the HOME content */}
          <Route path="/newpost" component={NewPost} />
          <Route path="/posts" component={Post} />
        </Router>
      </header>
    </div>
  );
}

export default App;
