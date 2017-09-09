import React from 'react';
import MarkdownComponent from './MarkdownComponent';
import Disqus from './disqus';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { PostConfig } from './PostList';
import {ShareButtons, generateShareIcon} from 'react-share';
import './Post.css';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  RedditShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');
const RedditIcon = generateShareIcon('reddit');

class Post extends React.Component {
  
  render() {
    const id = this.props.id;
    const content = PostConfig[id];
    const title = content.title;
    const disqusId = window.location.hostname.replace(/\./g, '-') + title.replace(/[^\w\s]/gi, '').toLowerCase().split(' ').join('-');

    const disqusConfig = {
      url: window.location.href,
      identifier: disqusId,
      title,
    };
    

    const shareUrl = window.location.href;

    document.title = content.title;
    return <div className="container">
      <div className="row">
        <div className="col-md-6" />
        <div className="col-md-6 pull-right">
          <div className="react-share-button-block">
            <FacebookShareButton
              url={shareUrl}
              quote={title}
              className="react-share-button">
              <FacebookIcon
                size={32}
                round />
            </FacebookShareButton>

          </div>
          <div className="react-share-button-block">
            <GooglePlusShareButton
              url={shareUrl}
              quote={title}
              className="react-share-button">
              <GooglePlusIcon
                size={32}
                round />
            </GooglePlusShareButton>

          </div>
          <div className="react-share-button-block">
            <LinkedinShareButton
              url={shareUrl}
              quote={title}
              className="react-share-button">
              <LinkedinIcon
                size={32}
                round />
            </LinkedinShareButton>

          </div>
          <div className="react-share-button-block">
            <TwitterShareButton
              url={shareUrl}
              quote={title}
              className="react-share-button">
              <TwitterIcon
                size={32}
                round />
            </TwitterShareButton>
            
          </div>
          <div className="react-share-button-block">
            <RedditShareButton
              url={shareUrl}
              quote={title}
              className="react-share-button">
              <RedditIcon
                size={32}
                round />
            </RedditShareButton>

          </div>
        </div>
      </div>
      <div className="row">
        <MarkdownComponent markdownSrcPromise={content.markdownSrcPromise} />
      </div>
      <div className="row">
        <Disqus.DiscussionEmbed shortname="bam4d" config={disqusConfig} />
      </div>
    </div>;
  }
}

export default Post;