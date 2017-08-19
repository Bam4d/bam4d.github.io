import React from 'react';
import MarkdownComponent from './MarkdownComponent';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Post extends React.Component {
  
  render() {
    console.log('rendering post', this.props);
    return <MarkdownComponent markdownSrc={this.props.markdownSrc} />;
  }
}

export default Post;