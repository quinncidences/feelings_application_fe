import React from 'react';

class Login extends React.Component {

  constructor() {
    super()
    this.loginSubmit = this.loginSubmit.bind(this)
  }

  loginSubmit(ev) {
    ev.preventDefault()
    console.log("username: ", ev.target.elements.username.value)
    console.log("password:", ev.target.elements.password.value)

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          "username": ev.target.elements.username.value,
          "password": ev.target.elements.password.value
        }
      })
    })
    .then(res => res.json())
    .then(res => localStorage.setItem("jwt", res.user.id))
    // .then(window.location.href = 'http://localhost:3001/main')
  }

  render() {
  return (
    <div>
      <form onSubmit={(ev) => this.loginSubmit(ev)}>
        <div>
          <input type="text" name="username" placeholder="Username" />
        </div>
        <div>
          <input type="password" name="password" placeholder="Password" />
        </div>
        <input type="submit" value="Login" />
      </form>
    </div>
  )}
}

export default Login;
