import React from 'react';

function PictureList({ pictures }) {
  const itemList = pictures.map(picture =>
    <li key={ picture.id }>
      <h1>
        { picture.id } - { picture.title }
      </h1>
      <img src={picture.thumbnailUrl} alt={ picture.title } />
    </li>
  );

  return (<ol>{ itemList }</ol>);
};

export default PictureList;
