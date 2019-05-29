import React from 'react';

class Post extends React.Component {

  constructor() {
    super()
    this.state = {
      user: localStorage.getItem("jwt")
    }
  }

  newPostSubmit(ev) {
    ev.preventDefault()
    let form = document.getElementById("new-post-form")


    fetch('http://localhost:3000/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      post: {
        "user_id": this.state.user,
        //Will be targeted to find the user id of whoever is logged in
        "content": ev.target.elements.content.value
      }
    })
  })
    .then(r => r.json())
    .then(r => console.log("CREATED POST"))
    .then(form.reset())
  }




  render() {
    console.log(this.state.user)
  return (
    <div>
    <a href="http://localhost:3001/main">Dashboard</a><br></br>
    <p>Current User: {this.state.user}</p>
      <div className="new-post-container">
        <form id="new-post-form" onSubmit={(ev) => this.newPostSubmit(ev)}>
          <div>
            <textarea name="content" rows="20" cols="50" placeholder="Enter feelings here..."></textarea>
          </div>
          <input type="submit" value="Add Feeling" />
        </form>
      </div>
    </div>
  )}
}

export default Post;
