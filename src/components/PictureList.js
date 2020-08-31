import React from 'react';

function PictureList({ pictures }) {
  console.log(pictures);
  const itemList = pictures.map(picture =>
    <div className="columns">
      <div className="column box mb-3">
        <div className="media" key={ picture.id }>
          <div className="media-left">
            <img src={picture.thumbnailUrl} alt={ picture.title } />
          </div>
          <div className="media-content">
            { picture.title }
          </div>
        </div>
      </div>
    </div>
  );

  return (<div className="my-3">{ itemList }</div>);
};

export default PictureList;
