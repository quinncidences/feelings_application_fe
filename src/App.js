import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Home from './containers/Home'
import Login from './components/Login'
import NewAccount from './components/NewAccount'
import NewPost from './components/NewPost'
import Main from './containers/Main'

class App extends React.Component {


  logOut(ev) {
    ev.preventDefault()
    console.log("Logged OUTTTT")
    localStorage.clear();
    window.location.href = 'http://localhost:3001/login'
  }

  render() {
  return (
    <div>
      <header>
        <p>HOME PAGE</p>
        <button onClick={(ev)=>this.logOut(ev)}>Logout</button>
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
