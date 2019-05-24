import React from 'react';
import ClapFilled from './clapping-filled.png';
import ClapUnfilled from './clapping-unfilled.png';

class Post extends React.Component {

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

  render() {
  return (
    <div>
      <div className="post-container">
        <p>POST AUTHOR</p>
        <p>POST CONTENT</p>
        <p>POST TIMESTAMP</p>
      </div>
      <div className="clap-image">
        <img id="post-clap" src={ClapUnfilled} alt="Unfied Clap" onClick={() => this.clapClick()}/>
      </div>
    </div>
  )}
}

export default Post;
