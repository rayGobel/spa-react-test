import React from 'react';
import PostButton from './PostButton';

function AlbumButton({ user, onClick }) {
  return (
    <a href="#" onClick={(ev) => { ev.preventDefault(); onClick(user); }}>Albums</a>
  );
}

function UserList({ users, seeUserPost, seeUserAlbum }) {
  const listItems = users.map(user =>
    <li key={user.id}>
      <div className="columns">
        <div className="column is-four-fifth">
          <p>{ user.name }</p>
        </div>
        <div className="column">
          <PostButton user={user} onClick={seeUserPost} /> | <AlbumButton user={user} onClick={seeUserAlbum} />
        </div>
      </div>
    </li>
  );

  return (
    <ol>{ listItems }</ol>
  )
}

export default UserList;
