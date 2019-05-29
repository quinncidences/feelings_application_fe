import React from 'react';
import Post from '../components/Post'

const POSTS = 'http://localhost:3000/posts'

class Main extends React.Component {

  constructor() {
    super()
    this.state = {
      posts: null,
      user: localStorage.getItem("jwt")
    }
    this.fetchPosts = this.fetchPosts.bind(this)
    this.addFeeling = this.addFeeling.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  componentWillMount() {
    this.fetchPosts();
  }

  fetchPosts() {
    fetch(POSTS)
    .then(res => res.json())
    .then(posts => {
      this.setState ({
        posts: posts
      })
    })
  }

  addFeeling() {
    window.location.href = 'http://localhost:3001/newpost'
  }

  logOut(ev) {
    ev.preventDefault()
    console.log("Logged OUTTTT")
    localStorage.clear();
    window.location.href = 'http://localhost:3001/login'
  }

  render() {
    if (!this.state.posts) {
      return <div />
    }
    return (
      <div>
        <button onClick={(ev)=>this.logOut(ev)}>Logout</button>
        <p>Current User ID: {this.state.user}</p>
        <div id="add-post-button">
          <button type="button" onClick={() => this.addFeeling()}>Add Your Feelings</button>
        </div>
        <Post posts={this.state.posts} />
      </div>
    )
  }
}

export default Main;
