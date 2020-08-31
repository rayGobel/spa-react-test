import React from 'react';

function Album({ album, seeAlbumDetail }) {
  const listItems = album.map((entry, index) =>
    <li key={entry.id}>
      <h1>
        # { index + 1 } - { entry.title }
      </h1>
      <a href="#" onClick={() => seeAlbumDetail(entry) }>See Detail</a>
    </li>
  );
  return (<ul>{ listItems }</ul>);
}

export default Album;
