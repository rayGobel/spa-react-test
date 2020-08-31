import React from 'react';

function PostButton({ user, onClick }) {
  return (
    <a href="#" onClick={(ev) => { ev.preventDefault(); onClick(user); }} >Posts</a>
  );
};

export default PostButton;
