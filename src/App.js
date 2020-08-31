import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';

import UserList from './components/UserList';
import Album from './components/Album';
import PictureList from './components/PictureList';
import PostList from './components/PostList';

const APP_STATE = {
  INIT: 'init',
  LOADING: 'loading',
  SHOWING_USER_LIST: 'showUserList',
  SHOWING_USER_POSTS: 'showUserPosts',
  SHOWING_USER_ALBUMS: 'showUserAlbums',
  SHOWING_POST_DETAIL: 'showPostDetail',
  SHOWING_ALBUM_ENTRIES: 'showAlbumEntries',
};

function fetchUsers() {
  const url = `https://jsonplaceholder.typicode.com/users`;
  return fetch(url)
    .then(res => res.json())
    .then(res => res);
};

function fetchUserPosts(userId) {
  if (!userId) {
    const ErrNoUserId = new Error('No User ID specified for request: fetchPosts');
    return Promise.reject(ErrNoUserId);
  }

  const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
  return fetch(url)
    .then(res => res.json());
};

function fetchUserAlbum(userId) {
  if (!userId) {
    const ErrNoUserId = new Error('No User ID specified for request: fetchAlbums');
    return Promise.reject(ErrNoUserId);
  }

  const url = `https://jsonplaceholder.typicode.com/albums?userId=${userId}`;
  return fetch(url)
    .then(res => res.json());
};

function fetchAlbumDetail(albumId) {
  if (!albumId) {
    const ErrNoAlbumId = new Error('No Album ID specified for request: fetchAlbumDetail');
    return Promise.reject(ErrNoAlbumId);
  }

  const url = `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`;
  return fetch(url)
    .then(res => res.json());
};

function updateUsers({ setUsers }) {
  return fetchUsers()
    .then(users => setUsers(users));
};

function handleSeeUserPost(user, { setPosts, setAppState }) {
  return fetchUserPosts(user.id)
    .then(userPosts => setPosts(userPosts))
    .then(() => setAppState(APP_STATE.SHOWING_USER_POSTS));
};

function handleSeeUserAlbum(user, { setAlbum, setAppState }) {
  return fetchUserAlbum(user.id)
    .then(album => setAlbum(album))
    .then(() => setAppState(APP_STATE.SHOWING_USER_ALBUMS));
};

function handleSeeAlbumDetail(albumEntry, { setAlbumPictures, setAppState }) {
  return fetchAlbumDetail(albumEntry.id)
    .then(pictures => setAlbumPictures(pictures))
    .then(() => setAppState(APP_STATE.SHOWING_ALBUM_ENTRIES));
}

function App() {

  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [album, setAlbum] = useState([]);
  const [albumPictures, setAlbumPictures] = useState([]);

  const [appState, setAppState] = useState(APP_STATE.INIT);

  useEffect(() => {
    if (users.length === 0) {
      updateUsers({ setUsers });
      setAppState(APP_STATE.SHOWING_USER_LIST);
    }
  }, [users]);

  return (
    <div className="App">
      <main>

        { appState === APP_STATE.SHOWING_USER_LIST ?
          <div className="user__list columns">
            <div className="column">
              <UserList
                users={users}
                seeUserPost={(user) => handleSeeUserPost(user, { setPosts, setAppState })}
                seeUserAlbum={(user) => handleSeeUserAlbum(user, { setAlbum, setAppState })}
              />
            </div>
          </div> : ''
        }

        { appState === APP_STATE.SHOWING_USER_POSTS ?
          <div className="user__posts">
            <PostList posts={posts} />
          </div> : ''
        }

        { appState === APP_STATE.SHOWING_USER_ALBUMS ?
          <div className="user__album">
            <Album
              album={album}
              seeAlbumDetail={(albumEntry) => handleSeeAlbumDetail(albumEntry, { setAlbumPictures, setAppState } )}
            />
          </div> : ''
        }

        { appState === APP_STATE.SHOWING_ALBUM_ENTRIES ?
          <div className="album__pictures">
            <PictureList pictures={albumPictures} />
          </div> : ''
        }

      </main>
    </div>
  );
}

export default App;
