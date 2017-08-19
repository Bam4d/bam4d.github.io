import React from 'react';
import PostItem from './PostItem';


// Contains a list of posts that I have made and where the markdown for those blogs are stored
const posts = [
  {title: 'Blogging using React, Markdown and MathJax', markdownSrcPromise: import('./posts/markdown/react-markdown-mathjax.md'), tags: ['React', 'MathJax', 'Markdown'], category: 'Meta', date: 'Saturday, 19th August 2017'},
  // {title: 'Blogging using React, Markdown and MathJax', markdownSrc: './posts/markdown/react-markdown-mathjax.md', tags: ['React', 'MathJax', 'Markdown'], category: 'Meta', date: 'Saturday, 19th August 2017'},
  // {title: 'Blogging using React, Markdown and MathJax', markdownSrc: './posts/markdown/react-markdown-mathjax.md', tags: ['React', 'MathJax', 'Markdown'], category: 'Meta', date: 'Saturday, 19th August 2017'},
  // {title: 'Blogging using React, Markdown and MathJax', markdownSrc: './posts/markdown/react-markdown-mathjax.md', tags: ['React', 'MathJax', 'Markdown'], category: 'Meta', date: 'Saturday, 19th August 2017'},
  // {title: 'Blogging using React, Markdown and MathJax', markdownSrc: './posts/markdown/react-markdown-mathjax.md', tags: ['React', 'MathJax', 'Markdown'], category: 'Meta', date: 'Saturday, 19th August 2017'},
];


class PostList extends React.Component {
  render() {
    return (
      <div> {
        posts.map((postProps) => {
          return <PostItem doNavigate={this.props.doNavigate} postData={postProps} />;
        })
      }
      </div>
    );
  } 
}


export default PostList;