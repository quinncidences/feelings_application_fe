import React from 'react';
import NewPost from '../components/NewPost'
import Post from '../components/Post'

class Main extends React.Component {

  constructor() {
    super()
    this.state = {
      posts: []
    }
    this.getPosts()
  }

  getPosts() {
    fetch('http://localhost:3000/posts')
    .then(res => res.json())
    .then(posts => {
      this.setState ({posts: posts})
    })
  }

  addFeeling() {
    console.log("Clicked Add Feeling Button")
  }

  render() {
    console.log("sent from Main: ", this.state.posts)
  return (
    <div>
      <div id="add-post-button">
        <button type="button" onClick={() => this.addFeeling()}>Add Your Feelings</button>
      </div>
      <Post posts={this.state.posts} />
    </div>
  )}
}

export default Main;
