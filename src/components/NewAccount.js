import React from 'react';

class NewAccount extends React.Component {

  constructor() {
    super()
    this.state = {
      cities: ["Online", "Atlanta", "Austin", "Brooklyn", "Chicago", "Denver", "Houston", "London", "New York", "Seattle", "Washington D.C."],
      courses: ["Data Science - In-Person", "Data Science - Online", "Software Engineering - In-Person", "Software Engineering - Online", "UX/UI Design"]
    }
  }

  newUserSubmit(ev) {
    ev.preventDefault()
    let form = document.getElementById("new-user-form")

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          "first_name": ev.target.elements.firstname.value,
          "last_name": ev.target.elements.lastname.value,
          "username": ev.target.elements.username.value,
          "course": ev.target.elements.coursedropdown.value,
          "city": ev.target.elements.citydropdown.value,
          "password": ev.target.elements.password.value
        }
      })
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .then(form.reset())
  }

  render() {
  return (
    <div className="account-container">
      <form id="new-user-form" onSubmit={(ev) => this.newUserSubmit(ev)}>
        <div>
          <input type="text" name="firstname" placeholder="First Name" />
        </div>
        <div>
          <input type="text" name="lastname" placeholder="Last Name" />
        </div>
        <div>
          <input type="text" name="username" placeholder="Username" />
        </div>
        <div>
          Select your city:<select name="citydropdown">
          {this.state.cities.map(city => {
            return <option key={city} name="city" value={city}>{city}</option>
          })}
          </select>
        </div>
        <div>
          Select your course:<select name="coursedropdown">
          {this.state.courses.map(course => {
            return <option key={course} name="course" value={course}>{course}</option>
          })}
          </select>
        </div>
        <div>
          <input type="password" name="password" placeholder="Create Password" />
        </div>
        <div>
          <input type="password" name="password_confirmation" placeholder="Confirm Password" />
        </div>

        <input type="submit" value="Create Account" />
      </form>
    </div>
  )}
}

export default NewAccount;
