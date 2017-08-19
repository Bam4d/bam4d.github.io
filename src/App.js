import React, { Component } from 'react';
import PostList from './PostList';
import Post from './Post';
import './App.css';
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

class App extends Component {

  constructor(props) {
    super(props);
    loadScript(MATHJAX_SCRIPT, () => {
      window.MathJax.Hub.Config(MATHJAX_OPTIONS);
    });

    this.state = {location: 'home'};
  }

  doNavigate = (nav) => {
    this.setState(nav);
  }

  getContent = () => {
    console.log(this.state);
    switch(this.state.location) {
      case 'home':
        return (
          <div className="">
            <PostList doNavigate={this.doNavigate.bind(this)} />
          </div>
        );
      case 'post':
        return (
          <div className="">
            <Post doNavigate={this.doNavigate.bind(this)} markdownSrcPromise={this.state.options.markdownSrcPromise} />
          </div>
        );
      case 'cv':
        return <div>soon...</div>;
      default:
        return <div>404...</div>;
    }
  }

  render() {

    return (
      <div className="App">
        <div className="App-header">
          <h2>Chris Bamford&#39;s Tech Blog</h2>
        </div>
        <div className="container">
          <ul className="nav nav-tabs">
            <li role="presentation" className="active"><a href="#" onClick={() => this.doNavigate({location: 'home'})}>Home</a></li>
            <li role="presentation"><a href="#" onClick={() => this.doNavigate({location: 'cv'})}>CV</a></li>
            
          </ul>
          {this.getContent()}
        </div>
      </div>
    );
  }
}

export default App;
