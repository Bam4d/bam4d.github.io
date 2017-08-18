import React, { Component } from 'react';
import MathJax from 'mathjax'
import MarkdownComponent from './MarkdownComponent';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import testmd from './posts/testmarkdown.md';
//import 'file?name=[name].[ext]!./devtools_page.html';


const DEFAULT_OPTIONS = {
    tex2jax: {
        inlineMath: []
    },
    showMathMenu: false,
    showMathMenuMSIE: false
};

class App extends Component {

  componentDidMount() {
    window.MathJax.Hub.Config(DEFAULT_OPTIONS);
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
            <MarkdownComponent markdownSrc={testmd}></MarkdownComponent>
            <MarkdownComponent markdownText="# Here is some text"></MarkdownComponent>
          </div>
          </div>
      </div>
    );
  }
}

export default App;
