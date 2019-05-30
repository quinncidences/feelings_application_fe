import React from 'react';

class Login extends React.Component {

  constructor() {
    super()
    this.loginSubmit = this.loginSubmit.bind(this)
  }

  loginSubmit(ev) {
    ev.preventDefault()
    let form = document.getElementById("login-form")

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
    .then(form.reset())
    .then(() => this.redirectMain())
  }

  redirectMain() {
    window.location.href = 'http://localhost:3001/main'
  }

  render() {
  return (
    <div>
      <h3>Login</h3>
      <a className="button" href="http://localhost:3001/newaccount">Create an Account</a><br></br>
      <div className="account-container">
        <form className="login-form" onSubmit={(ev) => this.loginSubmit(ev)}>
          <div>
            <input type="text" name="username" placeholder="Username" />
          </div>
          <div>
            <input type="password" name="password" placeholder="Password" />
          </div>
          <input className="button" type="submit" value="Login" />
        </form>
      </div>
    </div>
  )}
}

export default Login;
