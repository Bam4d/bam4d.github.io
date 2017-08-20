import React from 'react';
import { Link } from 'react-router-dom';

class PostListItem extends React.Component {

  render() {

    const tags = this.props.tags.map(function(tag) {
      return <span className="badge badge-info">{tag}</span>;
    });

    const id = this.props.id;
    const title = this.props.title;
    const path = title.replace(/[^\w\s]/gi, '').toLowerCase().split(' ').join('-') + '/'+id;

    return (
      <div className="row">
        <div className="col-lg-8">
          <h1><Link to={'/post/'+path}>{title}</Link></h1>
          <hr/>
          <p><i className="fa fa-calendar" /> Posted on: {this.props.date}</p>
          <p><i className="fa fa-tags" /> Tags:  {tags}</p>
        </div>
      </div> 
        
    );
  }
        
}
    
    
export default PostListItem;
