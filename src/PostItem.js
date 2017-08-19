import React from 'react';


class PostItem extends React.Component {

  propTypes = {
    doNavigate: React.PropTypes.func,
  };
    
  render() {

    const tags = this.props.postData.tags.map(function(tag) {
      return <span className="badge badge-info">{tag}</span>;
    });
    return (
      <div className="row">
        <div className="col-lg-8">
          <h1><a href="#" onClick={() => this.props.doNavigate({location: 'post', options: this.props.postData})}>{this.props.postData.title}</a></h1>
          <hr/>
          <p><i className="fa fa-calendar" /> Posted on: {this.props.postData.date}</p>
          <p><i className="fa fa-tags" /> Tags:  {tags}</p>
        </div>
      </div> 
        
    );
  }
        
}
    
    
export default PostItem;
