import React from 'react';
import ClapFilled from './clapping-filled.png';
import ClapUnfilled from './clapping-unfilled.png';

class Post extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      current_index: this.props.posts.length,
      current_post: {
          id: 1,
          user_id: 1,
          content: "I took this course because I really want to learn to code. It is stressing me out though. Will it get easier?",
          claps: [
            {
              id: 3,
              user_id: 3,
              post_id: 1,
              created_at: "2019-05-23T23:18:38.122Z",
              updated_at: "2019-05-23T23:18:38.122Z"
            }
          ],
          user: {
            id: 1,
            course: "Software Engineering - In-Person",
            city: "London",
            created_at: "2019-05-23T23:18:38.015Z",
            updated_at: "2019-05-23T23:18:38.015Z",
            first_name: "Mark",
            last_name: "Thomas"
          },
          created_at: "2019-05-23T23:18:38.046Z"
        }
    }
    this.getCurrentPost()
  }

  getCurrentPost() {
    let last_post = this.props.posts[this.state.posts_count]
    console.log("getCurrentPost: ", this.props.posts)
  }

  clapClick() {
    let clap = document.getElementById("post-clap")
    if (clap.alt === "Unfilled Clap") {
      clap.src = ClapFilled
      clap.alt = "Filled Clap"
    } else {
      clap.src = ClapUnfilled
      clap.alt = "Unfilled Clap"
    }
  }

  backPost() {
    // let max = this.props.posts.length
    // this.setState({
    //   current_index: current_index + 1,
    //   current_post: this.props.posts[current_index]
    // })
    let sample_index = 4
    sample_index += 1
    console.log("BACK: ", sample_index)

  }
  nextPost() {
    // let max = this.props.posts.length
    // this.setState({
    //   current_index: current_index - 1,
    //   current_post: this.props.posts[current_index]
    // })
    let sample_index = 4
    sample_index -= 1
    console.log("Thank you...NEXT: ", sample_index)
  }

  render() {
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
        <p>{this.state.current_post.content}</p>
        <p>{this.state.current_post.created_at}</p>
      </div>
      <div className="clap-image">
        <img id="post-clap" src={ClapUnfilled} alt="Unfied Clap" onClick={() => this.clapClick()}/>
      </div>
    </div>
  )}
}

export default Post;
