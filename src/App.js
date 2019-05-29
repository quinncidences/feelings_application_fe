import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Home from './containers/Home'
import Login from './components/Login'
import NewAccount from './components/NewAccount'
import NewPost from './components/NewPost'
import Main from './containers/Main'

class App extends React.Component {

  render() {
  return (
    <div>
      <header>
        <p>FEELINGS</p>
        <Router>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/newaccount" component={NewAccount} />
          {/* I want this to show up without the HOME content */}
          <Route exact path="/main" component={Main} />
          <Route exact path="/newpost" component={NewPost} />
          {/*<Route exact path="/posts" component={Post} /> */}
        </Router>
      </header>
    </div>
  )};
}

export default App;
