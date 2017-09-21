import React from 'react';
import MarkdownComponent from './MarkdownComponent';
import Disqus from './disqus';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { PostConfig } from './PostList';
import {ShareButtons, generateShareIcon} from 'react-share';
import MetaTags from 'react-meta-tags';
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
    const url = window.location.href;

    const disqusConfig = {
      url,
      identifier: disqusId,
      title,
    };
    
    const seo_image = content.seo_image;
    const seo_description = content.seo_description;
    const seo_sitename = 'Bam4d\'s blog';
    const posted_date = content.date;
    const seo_keywords = content.category + ',' + content.tags.join(',');

    const shareUrl = window.location.href;

    document.title = content.title;
    return <div className="container">
      <MetaTags>

        <meta id="meta-keywords" name="keywords" content={seo_keywords} />
        <meta id="meta-description" name="description" content={seo_description} />
        
        <meta id="og-title" property="og:title" content={title} />
        <meta id="og-image" property="og:image" content={seo_image} />
        <meta id="og-url" property="og:url" content={url} />
        <meta id="site-name" propert="og:site_name" content={seo_sitename} />
        
        <meta id="twitter-card" name="twitter:card" content="summary_large_image" />
        <meta id="twitter-domain"  name="twitter:domain" value="bam4d.github.io" />
        <meta id="twitter-title" name="twitter:title" value={title}  />
        <meta id="twitter-description" name="twitter:description" value={seo_description} />
        <meta id="twitter-image" name="twitter:image" content={seo_image} />
        <meta id="twitter-url" name="twitter:url" value={url} />
        <meta id="twitter-label1" name="twitter:label1" value="Posted" />
        <meta id="twitter-data1" name="twitter:data1" value={posted_date} />
      </MetaTags>
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