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
      post: {
        "user_id": 1,
        //Will be targeted to find the user id of whoever is logged in
        "content": ev.target.elements.content.value
      }
    })
  })
    .then(r => r.json())
    .then(r => console.log("CREATED POST"))
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
