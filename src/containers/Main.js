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
  }

  componentWillMount() {
    this.fetchPosts();
  }

  componentDidUpdate() {
    this.actionButtonText();
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

  feelingButton() {
    if (this.state.user === null) {
      window.location.href = 'http://localhost:3001/login'
    } else {
      window.location.href = 'http://localhost:3001/newpost'
    }
  }

  actionButtonText() {
    const button = document.getElementById("user-register")
    const feelbutton = document.getElementById('feel-button')
    if (this.state.user === null) {
      button.textContent = "Sign In"
      feelbutton.textContent = "Login to Add a Feeling"
    } else {
      button.textContent = "Logout"
      feelbutton.textContent = "Add a Feeling"

    }
  }

  actionButtonFunction() {
    if (this.state.user === null) {
      window.location.href = 'http://localhost:3001/login'
    } else {
      localStorage.clear();
      window.location.href = 'http://localhost:3001/login'
    }
  }

  render() {
    if (!this.state.posts) {
      return <div />
    }
    return (
      <div id="main-div">
        <button id="user-register" className="button" onClick={()=>this.actionButtonFunction()}>Logout</button>
        <p>Current User ID: {this.state.user}</p>
        <div id="add-post-button">
          <button id="feel-button" className="button" type="button" onClick={() => this.feelingButton()}>Add Your Feelings</button>
        </div>
        <Post posts={this.state.posts} />
      </div>
    )
  }
}

export default Main;
