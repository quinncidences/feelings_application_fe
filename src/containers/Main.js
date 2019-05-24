import React from 'react';
import NewPost from '../components/NewPost'
import Post from '../components/Post'

const POSTS = 'http://localhost:3000/posts'

class Main extends React.Component {

  constructor() {
    super()
    this.state = {
      posts: null
    }
    this.fetchPosts = this.fetchPosts.bind(this)
    this.addFeeling = this.addFeeling.bind(this)
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
    console.log("Clicked Add Feeling Button")
  }

  render() {
    if (!this.state.posts) {
      return <div />
    }
    return (
      <div>
        <div id="add-post-button">
          <button type="button" onClick={() => this.addFeeling()}>Add Your Feelings</button>
        </div>
        <Post posts={this.state.posts} />
      </div>
    )
  }
}

export default Main;
