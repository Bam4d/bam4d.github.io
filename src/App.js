import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import PostList from './PostList';
import MarkdownComponent from './MarkdownComponent';
import Post from './Post';
import './App.css';
import Logo from './images/blog logo.png';
import loadScript from 'load-script';

const MATHJAX_SCRIPT = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML';

const MATHJAX_OPTIONS = {
  tex2jax: {
    inlineMath: [ ['$','$'], ['\\(','\\)'] ],
    displayMath: [ ['$$','$$'], ['\\[','\\]'] ],
  },
  showMathMenu: false,
  showMathMenuMSIE: false,
};

const HomePage = () => {
  document.title = 'Bam4d\'s Blog';
  return <div className="">
    <MarkdownComponent markdownSrcPromise={import('./posts/markdown/aboutme.md')} />
  </div>;
};

const PostPage = (postOptions) => (
  <div className="">
    <Post id={postOptions.match.params.postId} />
  </div>
);

const CVPage = () => {
  document.title = 'Bam4d\'s CV';
  return <div className="">
    <MarkdownComponent markdownSrcPromise={import('./posts/markdown/cv.md')} />
  </div>;
};

class App extends Component {

  constructor(props) {
    super(props);
    loadScript(MATHJAX_SCRIPT, () => {
      window.MathJax.Hub.Config(MATHJAX_OPTIONS);
    });

    this.state = {location: 'home'};
  }

  render() {

    return (
      <div className="App">
        <div className="App-header">
          <img src={Logo} className="logo-image"/>
        </div>
        <div className="container">
          
          <ul className="nav nav-tabs">
            <li role="presentation" className="clickable"><Link to="/">Home</Link></li>
            <li role="presentation" className="clickable"><Link to="/posts">Blog</Link></li>
            <li role="presentation" className="clickable"><Link to="/cv">CV</Link></li>
          </ul>
          <div>
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route path="/posts" component={PostList}/>
              <Route path="/cv" component={CVPage}/>
              <Route path="/post/:postName/:postId" component={PostPage}/>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
