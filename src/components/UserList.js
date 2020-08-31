import React from 'react';
import PostButton from './PostButton';

function UserList({ users, seeUserPost }) {
  const listItems = users.map(user =>
    <li key={user.id}>
    { user.id } - { user.name } | <PostButton user={user} onClick={seeUserPost} />
    </li>
  );

  return (
    <ul>{ listItems }</ul>
  )
}

export default UserList;
