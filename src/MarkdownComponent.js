import React from 'react';
import ReactDOM from 'react-dom';
import md from 'markdown-it';
import mj from 'markdown-it-mathjax';
import imsize from 'markdown-it-imsize';

import '../node_modules/highlightjs/styles/github-gist.css';
import hljs from 'highlightjs';

class MarkdownComponent extends React.Component {

  constructor(props) {
    super(props);
    this.md = md({
      highlight(str, lang) {
        debugger;
        if (lang && hljs.getLanguage(lang)) {
          debugger;
          try {
            return hljs.highlight(lang, str).value;
          } catch (__) {}
        }
    
        return ''; // use external default escaping
      },
      html: true,
    })
      .use(mj())
      .use(imsize, { autofill: true });

    this.state = {markdownData: ''};
  }

  componentWillMount() {
    if(this.props.markdownSrcPromise) {
      this.props.markdownSrcPromise.then((markdownSrc) => {
        fetch(markdownSrc)
            .then((response) => {
              if(!response.ok) {
                return '# Not Found';
              } else {
                
                return response.text();
              }
            }).then((markdownData) => {
              this.setMarkdown(markdownData);
            });
      });
    } else if(this.props.markdownText) {
      this.setMarkdown(this.props.markdownText);
    }
  }

  componentDidMount() {
    this.renderMathJax();
  }

  componentDidUpdate() {
    this.renderMathJax();
  }

  setMarkdown = (markdown) => {
    this.setState({markdownData: markdown});
  }

  renderMathJax = () => {
    if(window.MathJax) {
      const currentNode = ReactDOM.findDOMNode(this);
      window.MathJax.Hub.Queue(['Typeset',window.MathJax.Hub,currentNode]);
    }
  }

  render() {
    const markdown = this.md.render(this.state.markdownData);
    return <div className="blog-post col-lg" dangerouslySetInnerHTML={{__html:markdown}} />;
  }
};

export default MarkdownComponent;
