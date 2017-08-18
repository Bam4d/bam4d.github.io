import React, { Component } from 'react';
import md from 'markdown-it'
import mj from 'markdown-it-mathjax'

class MarkdownComponent extends React.Component {

    
    constructor(props) {
        super(props);
        this.md = md().use(mj());
    }

    render() {
        // pseudo code here, depends on the parser
        const markdown = this.md.render(this.props.markdown);
        return <div dangerouslySetInnerHTML={{__html:markdown}} />;
    }
};

export default MarkdownComponent;
