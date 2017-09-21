import React from 'react';
import PostListItem from './PostItem';

export const PostConfig = {
  '3': { 
    title: 'K Dimensional connect N - Part 2: Deep Learning', 
    markdownSrcPromise: import('./posts/markdown/k-dimensional-connect-n-p2.md'), 
    seo_image: './images/connect-4/3d-connect-4.jpg',
    seo_description: 'Deep Q networks can be trained to play k-dimensional versions of connect-n, here\'s how you can do it',
    tags: ['Games', 'Deep Q Learning', 'Python', 'TensorFlow'], 
    category: 'ML', 
    date: 'Saturday, 9th September 2017',
  },
  '2': { 
    title: 'K Dimensional connect N - Part 1: Environment', 
    seo_image: './images/connect-4/connect-4.jpg',
    seo_description: 'Extending the game of connect-4 to k-dimensional connect-n',
    markdownSrcPromise: import('./posts/markdown/k-dimensional-connect-n-p1.md'), 
    tags: ['Games', 'Maths', 'Algorithms', 'Python'], 
    category: 'Algorithms', 
    date: 'Monday, 4th September 2017',
  },
  '1': { 
    title: 'Blogging using React, Markdown and MathJax', 
    seo_description: 'How to create a react app and components that render Markdown and even MathJax',
    markdownSrcPromise: import('./posts/markdown/react-markdown-mathjax.md'), 
    tags: ['React', 'MathJax', 'Markdown', 'JS'], 
    category: 'Meta', 
    date: 'Saturday, 19th August 2017',
  },
  // {title: 'Blogging using React, Markdown and MathJax', markdownSrc: './posts/markdown/react-markdown-mathjax.md', tags: ['React', 'MathJax', 'Markdown'], category: 'Meta', date: 'Saturday, 19th August 2017'},
  // {title: 'Blogging using React, Markdown and MathJax', markdownSrc: './posts/markdown/react-markdown-mathjax.md', tags: ['React', 'MathJax', 'Markdown'], category: 'Meta', date: 'Saturday, 19th August 2017'},
  // {title: 'Blogging using React, Markdown and MathJax', markdownSrc: './posts/markdown/react-markdown-mathjax.md', tags: ['React', 'MathJax', 'Markdown'], category: 'Meta', date: 'Saturday, 19th August 2017'},
};

class PostList extends React.Component {
  render() {

    const postItems = [];
    Object.keys(PostConfig).sort().reverse().forEach(function(id) {
      const postProps = PostConfig[id];
      postItems.push((<PostListItem date={postProps.date} id={id} title={postProps.title} tags={postProps.tags} />));
    });

    return (
      <div> {postItems}</div>
    );
  } 
}


export default PostList;