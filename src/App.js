import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';

import UserList from './components/UserList';
import Album from './components/Album';
import PictureList from './components/PictureList';
import PostList from './components/PostList';
import api from './service/api';

const APP_STATE = {
  INIT: 'init',
  LOADING: 'loading',
  SHOWING_USER_LIST: 'showUserList',
  SHOWING_USER_POSTS: 'showUserPosts',
  SHOWING_USER_ALBUMS: 'showUserAlbums',
  SHOWING_POST_DETAIL: 'showPostDetail',
  SHOWING_ALBUM_ENTRIES: 'showAlbumEntries',
};

function updateUsers({ setUsers }) {
  return api.fetchUsers()
    .then(users => setUsers(users));
};

function handleSeeUserPost(user, { setPosts, setAppState }) {
  return api.fetchUserPosts(user.id)
    .then(userPosts => setPosts(userPosts))
    .then(() => setAppState(APP_STATE.SHOWING_USER_POSTS));
};

function handleSeeUserAlbum(user, { setAlbum, setAppState }) {
  return api.fetchUserAlbum(user.id)
    .then(album => setAlbum(album))
    .then(() => setAppState(APP_STATE.SHOWING_USER_ALBUMS));
};

function handleSeeAlbumDetail(albumEntry, { setAlbumPictures, setAppState }) {
  return api.fetchAlbumDetail(albumEntry.id)
    .then(pictures => setAlbumPictures(pictures))
    .then(() => setAppState(APP_STATE.SHOWING_ALBUM_ENTRIES));
};

function viewUserList(setAppState) {
  setAppState(APP_STATE.SHOWING_USER_LIST);
};

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
      <nav>
        <a href="#" onClick={ () => viewUserList(setAppState) }>Home</a>
      </nav>

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
