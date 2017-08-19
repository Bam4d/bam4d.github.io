import React, { Component } from 'react';
import MarkdownComponent from './MarkdownComponent';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import testmd from './posts/testmarkdown.md';
import loadScript from 'load-script'

const MATHJAX_SCRIPT = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML";

const MATHJAX_OPTIONS = {
    tex2jax: {
      inlineMath: [ ['$','$'], ['\\(','\\)'] ],
      displayMath: [ ['$$','$$'], ['\[','\]'] ]
    },
    showMathMenu: false,
    showMathMenuMSIE: false
};

class App extends Component {

  constructor(props) {
    super(props);
    console.log("doing configuration step");
    loadScript(MATHJAX_SCRIPT, () => {
      console.log("loading mathjax options");
      window.MathJax.Hub.Config(MATHJAX_OPTIONS);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Chris Bamford's Tech Blog</h2>
        </div>
        <div className="container">
          <ul class="nav nav-tabs">
            <li role="presentation" class="active"><a href="#">Home</a></li>
            <li role="presentation"><a href="#">Profile</a></li>
            <li role="presentation"><a href="#">Messages</a></li>
          </ul>
          <div className="">
            <Post markdownSrc={testmd} title={} category={}></Post>
          </div>
          </div>
      </div>
    );
  }
}

export default App;
