import React from 'react';
import ClapFilled from './clapping-filled.png';
import ClapUnfilled from './clapping-unfilled.png';

class Post extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      posts: this.props.posts,
      current_index: this.props.posts.length - 1,
      current_post: this.props.posts[(this.props.posts.length - 1)],
      user: localStorage.getItem("jwt"),
      clap_status: null,
      current_claps: this.props.posts[(this.props.posts.length - 1)].claps,
    }
    this.actionClap = this.actionClap.bind(this)
    this.deleteClap = this.deleteClap.bind(this)
    this.createClap = this.createClap.bind(this)
    this.backPost = this.backPost.bind(this)
    this.nextPost = this.nextPost.bind(this)
  }

  componentWillMount() {
    this.getClapStatus()
  }

  getClapStatus() {
    let clapKeys = Object.keys(this.state.current_claps).length
    if (clapKeys > 0) {
      for (let i = 0; i < clapKeys; i++) {
        if (this.state.current_claps[i].user_id == this.state.user) {
          this.setState({clap_status: ClapFilled});
          break;
        } else {
          this.setState({clap_status: ClapUnfilled})
        }
      }
    } else {
      this.setState({clap_status: ClapUnfilled})
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
    .then(r => console.log("CREATED CLAP: ", r))
  }

  deleteClap() {
    fetch('http://localhost:3000/claps/1', {
    method: 'DELETE',
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
    .then(r => console.log("DELETED CLAP: ", r))
  }

  actionClap() {
   let clapKeys = Object.keys(this.state.current_claps).length
   if (clapKeys === 0) {
     this.setState({clap_status: ClapFilled}, () => this.createClap())
   } else {
     let hasUserClapped = false
     for (let i = 0; i < clapKeys; i++) {
       if (this.state.current_claps[i].user_id == this.state.user) {
         this.setState({clap_status: ClapUnfilled}, () => this.deleteClap())
         hasUserClapped = true
         break;
       }
     }

     if (!hasUserClapped) {
       this.setState({clap_status: ClapFilled}, () => this.createClap())
     }
   }
 }

  nextPost() {
    if (this.state.current_index === 0) {
      let newIndex = this.state.posts.length - 1
      this.setState({
        current_index: newIndex,
        current_post: this.state.posts[newIndex],
        current_claps: this.state.posts[newIndex].claps
      }, () => this.getClapStatus())
    } else {
      let newIndex = this.state.current_index - 1
      this.setState({
        current_index: newIndex,
        current_post: this.state.posts[newIndex],
        current_claps: this.state.posts[newIndex].claps
      }, () => this.getClapStatus())
    }
  }

  backPost() {
    console.log(this.state.current_post)
    console.log(this.state.user)
    if (this.state.current_index === this.state.posts.length - 1) {
      let newIndex = 0
      this.setState({
        current_index: newIndex,
        current_post: this.state.posts[newIndex],
        current_claps: this.state.posts[newIndex].claps
      }, () => this.getClapStatus())
    } else {
      let newIndex = this.state.current_index + 1
      this.setState({
        current_index: newIndex,
        current_post: this.state.posts[newIndex],
        current_claps: this.state.posts[newIndex].claps
      }, () => this.getClapStatus())
    }
  }

  convertDate(d) {
    let monthNames = [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    let parsed = Date.parse(d)
    let month = new Date(parsed).getMonth()
    let date = new Date(parsed).getDate()
    let year = new Date(parsed).getFullYear()
    let monthDateYear  = monthNames[month] + " " + date + ", " + year;
    return monthDateYear
  }

  deletePost() {
    if (this.state.user == this.state.current_post.user_id) {
      console.log("MATCH", this.state.user)
      console.log("MATCH", this.state.current_post.user)
      console.log("MATCH", this.state.current_post)
      fetch('http://localhost:3000/posts/1', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          post: {
            "id": this.state.current_post.id,
          }
        })
      })
        .then(r => console.log("DELETED POST: ", r))
    } else {
      console.log("NO MATCH", this.state.user)
      console.log("NO MATCH", this.state.current_post.user)
      console.log("NO MATCH", this.state.current_post)
    }
  }

  render() {
    if (!this.state.current_post) {
      return <div />
    }
    return (
      <div>
        {this.state.current_post.user_id}<br></br>
        {this.state.user}
        <div className="post-buttons">
          <div >
            <span id="back-post" onClick={() => this.backPost()}>BACK</span>
            <span id="next-post" onClick={() => this.nextPost()}>NEXT</span>
          </div>
        </div>
        <div className="post-container">
          <div className="post-header">
            <p>By: {this.state.current_post.user.username}</p>
            <p>{this.state.current_post.user.course} ({this.state.current_post.user.city})</p>
            <p>{this.convertDate(this.state.current_post.created_at)}</p>
          </div>
          <button id="delete-button" className="del-btn" type="button" onClick={() => this.deletePost()}>Delete</button>
          <div className="post-content">
            <p>{this.state.current_post.content}</p>
          </div>
        </div>
        <div className="clap">
          <img id="post-clap" src={this.state.clap_status} alt="clap" onClick={() => this.actionClap()} height="42" width="42"/>
        </div>
      </div>
    )
  }
}

export default Post;
