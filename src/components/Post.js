import React from 'react';
import ClapFilled from './clapping-filled.png';
import ClapUnfilled from './clapping-unfilled.png';

class Post extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      posts: this.props.posts,
      current_index: this.props.posts.length - 1,
      current_post: null,
      user: localStorage.getItem("jwt"),
      clap_status: null,
      current_claps: {user_id: 5, post_id: 3}
    }
    this.getCurrentPost = this.getCurrentPost.bind(this)
    this.clapClick = this.clapClick.bind(this)
    this.backPost = this.backPost.bind(this)
    this.nextPost = this.nextPost.bind(this)
    // this.createClap = this.createClap.bind(this)
  }

  componentWillMount() {
    this.getCurrentPost()
  }

  getCurrentPost() {
    let posts = this.props.posts
    let length = this.props.posts.length - 1
    let current_post = posts[length]
    this.setState({
      current_post: current_post,
      current_claps: current_post.claps
    })
    this.getClapStatus()
  }

  getClapStatus() {
    debugger
    if (this.state.current_claps.length > 0) {
      this.state.current_claps.map(clap => {
        if (clap.user_id === this.state.user) {
          return this.setState({
            clap_status: ClapFilled
          })
        }
      })
    } else {
      this.setState({
        clap_status: ClapUnfilled
      })
    }
  }


  createClap() {
    fetch('http://localhost:3000/claps', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      clap: {
        "user_id": this.state.user,
        "post_id": this.state.current_post.id,
      }
    })
  })
    .then(r => r.json())
    .then(r => console.log("CREATED CLAP: ", r))
  }

  // deleteClap() {
  //   fetch('http://localhost:3000/claps', {
  //   method: 'DELETE'
  // })
  //   .then(r => r.json())
  //   .then(r => console.log("DELETED CLAP: ", r))
  // }

  clapClick() {
    let clap = document.getElementById("post-clap")
    if (clap.alt === "Unfilled Clap") {
      clap.src = ClapFilled
      clap.alt = "Filled Clap"
      this.createClap()
    }
    // else {
    //   clap.src = ClapUnfilled
    //   clap.alt = "Unfilled Clap"
    //   this.deleteClap()
    // }
  }

  nextPost() {
    if (this.state.current_index === 0) {
      let newIndex = this.state.posts.length - 1
      this.setState({
        current_index: newIndex,
        current_post: this.state.posts[newIndex],
        current_claps: this.state.posts[newIndex].claps
      })
      this.getClapStatus()
    } else {
      let newIndex = this.state.current_index - 1
      this.setState({
        current_index: newIndex,
        current_post: this.state.posts[newIndex],
        current_claps: this.state.posts[newIndex].claps
      })
      this.getClapStatus()
    }
  }
  backPost() {
    if (this.state.current_index === this.state.posts.length - 1) {
      let newIndex = 0
      this.setState({
        current_index: newIndex,
        current_post: this.state.posts[newIndex],
        current_claps: this.state.posts[newIndex].claps
      })
      this.getClapStatus()
    } else {
      let newIndex = this.state.current_index + 1
      this.setState({
        current_index: newIndex,
        current_post: this.state.posts[newIndex],
        current_claps: this.state.posts[newIndex].claps
      })
      this.getClapStatus()
    }
  }

  render() {
    if (!this.state.current_post) {
      return <div />
    }
    return (
      <div>
        <div className="post-buttons">
          <div id="back-post" onClick={() => this.backPost()}>
            <h2>BACK</h2>
          </div>
          <div id="next-post" onClick={() => this.nextPost()}>
            <h2>NEXT</h2>
          </div>
        </div>
        <div className="post-container">
          <p>{this.state.current_post.user.first_name} {this.state.current_post.user.last_name}</p>
          <p>{this.state.current_post.user.city}</p>
          <p>{this.state.current_post.user.course}</p>
          <p>{this.state.current_post.content}</p>
          <p>{this.state.current_post.created_at}</p>
        </div>
        <div className="clap-image">
          <img id="post-clap" src={this.state.clap_status} alt="Unfilled Clap" onClick={() => this.clapClick()}/>
        </div>
      </div>
    )
  }
}

export default Post;
