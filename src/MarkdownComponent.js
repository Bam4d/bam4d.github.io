import React from 'react';
import ReactDOM from 'react-dom';
import md from 'markdown-it';
import mj from 'markdown-it-mathjax';

class MarkdownComponent extends React.Component {

  constructor(props) {
    super(props);
    this.md = md().use(mj());
    this.state = {markdownData: ''};
  }

  componentWillMount() {
    if(this.props.markdownSrc) {
      fetch(this.props.markdownSrc)
        .then((response) => {
          if(!response.ok) {
            return '# Not Found';
          } else {
            return response.text();
          }
        }).then((markdownData) => {
          this.setMarkdown(markdownData);
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
    const currentNode = ReactDOM.findDOMNode(this);
    window.MathJax.Hub.Queue(['Typeset',window.MathJax.Hub,currentNode]);
  }

  render() {
    const markdown = this.md.render(this.state.markdownData);
    return <div dangerouslySetInnerHTML={{__html:markdown}} />;
  }
};

export default MarkdownComponent;
