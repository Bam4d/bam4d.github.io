import React, { Component } from 'react';
import MarkdownComponent from './MarkdownComponent';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import testmd from './testmarkdown.md';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Chris Bamford's Tech Blog</h2>
        </div>
        <MarkdownComponent markdown={testmd}></MarkdownComponent>
      </div>
    );
  }
}

export default App;
