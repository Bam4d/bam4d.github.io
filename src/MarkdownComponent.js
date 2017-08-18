import React, { Component } from 'react';
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

    componentDidMount(root) {
        window.MathJax.Hub.Queue(["Typeset",window.MathJax.Hub,root]);
    }

    componentDidUpdate(props, state, root) {
        window.MathJax.Hub.Queue(["Typeset",window.Hub,root]);
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
        return <div dangerouslySetInnerHTML={{__html:markdown}} />;
    }
};

export default MarkdownComponent;
