import React from 'react';

function PostList({ posts }) {
  const listItems = posts.map(post =>
    <li key={post.id}>
      <h1>
        { post.id } - { post.title }
      </h1>
      <p>
        { post.body }
      </p>
    </li>
  );
  return (<ul>{ listItems }</ul>);
}

export default PostList;
