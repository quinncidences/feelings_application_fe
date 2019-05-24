import React from 'react';

class NewAccount extends React.Component {

  constructor() {
    super()
    this.state = {
      cities: ["Online", "Atlanta", "Austin", "Brooklyn", "Chicago", "Denver", "Houston", "London", "New York", "Seattle", "Washington D.C."],
      courses: ["Data Science - In-Person", "Data Science - Online", "Software Engineering - In-Person", "Software Engineering - Online", "UX/UI Design"]
    }
  }

  render() {
  return (
    <div>
      <form>
        <div>
          <input type="text" name="firstname" placeholder="First Name" />
        </div>
        <div>
          <input type="text" name="lastname" placeholder="Last Name" />
        </div>
        <div>
          Select your city:<select name="citydropdown">
          {this.state.cities.map(city => {
            return <option key={city} value={city}>{city}</option>
          })}
          </select>
        </div>
        <div>
          Select your course:<select name="coursedropdown">
          {this.state.courses.map(course => {
            return <option key={course} value={course}>{course}</option>
          })}
          </select>
        </div>
        <div>
          <input type="text" name="password" placeholder="Create Password" />
        </div>
        <div>
          <input type="text" name="confirmpassword" placeholder="Confirm Password" />
        </div>

        <input type="submit" value="Create Account" />
      </form>
    </div>
  )}
}

export default NewAccount;
