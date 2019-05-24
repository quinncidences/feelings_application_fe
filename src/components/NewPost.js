import React from 'react';

class Post extends React.Component {
  render() {
  return (
    <div className="post-container">
      <form>
        <div>
          <textarea name="content" rows="20" cols="50" placeholder="Enter feelings here..."></textarea>
        </div>
        <input type="submit" value="Add Feeling" />
      </form>
    </div>
  )}
}

export default Post;
