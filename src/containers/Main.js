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
    if (this.state.user === null) {
      button.textContent = "Sign In"
    } else {
      button.textContent = "Logout"
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
        <div id="add-post-button"><br></br><br></br><br></br>
          {this.state.user != null && <button className="button" type="button" onClick={() => this.feelingButton()}>Add A Feeling</button>}
        </div>
        <Post posts={this.state.posts} />
      </div>
    )
  }
}

export default Main;
