import React from 'react';

class Login extends React.Component {
  render() {
  return (
    <div>
      <form>
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
