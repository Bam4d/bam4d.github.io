import React from 'react';
import PostListItem from './PostItem';

export const PostConfig = {
  '1': { title: 'Blogging using React, Markdown and MathJax', markdownSrcPromise: import('./posts/markdown/react-markdown-mathjax.md'), tags: ['React', 'MathJax', 'Markdown'], category: 'Meta', date: 'Saturday, 19th August 2017'},
  '2': { title: 'K dimensional connect N', markdownSrcPromise: import('./posts/markdown/k-dimensional-connect-n.md'), tags: ['Games', 'Maths', 'Algorithms'], category: 'Algorithms', date: 'Monday, 4th September 2017'},
  // {title: 'Blogging using React, Markdown and MathJax', markdownSrc: './posts/markdown/react-markdown-mathjax.md', tags: ['React', 'MathJax', 'Markdown'], category: 'Meta', date: 'Saturday, 19th August 2017'},
  // {title: 'Blogging using React, Markdown and MathJax', markdownSrc: './posts/markdown/react-markdown-mathjax.md', tags: ['React', 'MathJax', 'Markdown'], category: 'Meta', date: 'Saturday, 19th August 2017'},
  // {title: 'Blogging using React, Markdown and MathJax', markdownSrc: './posts/markdown/react-markdown-mathjax.md', tags: ['React', 'MathJax', 'Markdown'], category: 'Meta', date: 'Saturday, 19th August 2017'},
};

class PostList extends React.Component {
  render() {

    const postItems = [];
    for (const id in PostConfig) {
      const postProps = PostConfig[id];
      postItems.push((<PostListItem date={postProps.date} id={id} title={postProps.title} tags={postProps.tags} />));
    }

    return (
      <div> {postItems}</div>
    );
  } 
}


export default PostList;