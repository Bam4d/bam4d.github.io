import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import md from 'markdown-it'
import mj from 'markdown-it-mathjax'

class MarkdownComponent extends React.Component {

    constructor(props) {
        super(props);
        this.md = md().use(mj());
        this.state = {markdownData: ""}
    }

    setMarkdown = (markdown) => {
        console.log("Setting markdown for page");
        this.setState({markdownData: markdown})
    }

    renderMathJax = () => {
        const currentNode = ReactDOM.findDOMNode(this);
        console.log("content did mount", currentNode);
        window.MathJax.Hub.Queue(["Typeset",window.MathJax.Hub,currentNode]);
    }

    componentDidMount() {
        this.renderMathJax();
    }

    componentDidUpdate(props, state) {
        console.log("props", props);
        console.log("state", state);
        this.renderMathJax();
    }

    componentWillMount() {

        if(this.props.markdownSrc) {
            fetch(this.props.markdownSrc)
            .then((response) => {
                
                if(!response.ok) {
                    return "# Not Found";
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

    render() {
        // pseudo code here, depends on the parser
        const markdown = this.md.render(this.state.markdownData);
        console.log("rendering");
        return <div dangerouslySetInnerHTML={{__html:markdown}} />;
    }
};

export default MarkdownComponent;
