import React from 'react';

function Album({ album, seeAlbumDetail }) {
  const listItems = album.map((entry, index) =>
    <div className="columns" key={entry.id}>
      <div className="column">
        <p className="is-size-5">
        { index + 1 } - { entry.title } :
        </p>
      </div>
      <div className="column">
        <a href="#" onClick={() => seeAlbumDetail(entry) }> view</a>
      </div>
    </div>
  );

  return (<div>{ listItems }</div>);
}

export default Album;
