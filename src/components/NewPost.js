import React from 'react';

class Post extends React.Component {

  newPostSubmit(ev) {
    ev.preventDefault()

    fetch('http://localhost:3000/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      user: {
        "user_id": 1,
        "password": ev.target.elements.content.value
      }
    })
  })
    .then(r => r.json())
    .then(console.log("CREATED"))
  }




  render() {
  return (
      <div className="new-post-container">
        <form onSubmit={(ev) => this.newPostSubmit(ev)}>
          <div>
            <textarea name="content" rows="20" cols="50" placeholder="Enter feelings here..."></textarea>
          </div>
          <input type="submit" value="Add Feeling" />
        </form>
      </div>
  )}
}

export default Post;
