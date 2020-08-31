import React, { useState, useEffect } from 'react';
import { Observable, Subscriber } from 'rxjs';
import 'bulma/css/bulma.css';

import UserList from './components/UserList';

const APP_STATE = {
  INIT: 'init',
  LOADING: 'loading',
  SHOWING_LIST: 'showList',
  SHOWING_POST_DETAIL: 'showPostDetail',
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

function updateUsers({ setUsers }) {
  return fetchUsers()
    .then(users => setUsers(users));
};

function handleSeeUserPost(user, setPosts) {
  return fetchUserPosts(user.id)
    .then(userPosts => setPosts(userPosts));
};

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
};

function App() {

  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    updateUsers({ setUsers });
  }, []);

  return (
    <div className="App">
      <main>
        <div className="columns">
          <div className="column">
            { users.length ? <UserList users={users} seeUserPost={(user) => handleSeeUserPost(user, setPosts)} /> : 'No Users' }
          </div>
        </div>
        <div className="user__posts">
            { posts.length ? <PostList posts={posts} /> : 'No Posts' }
        </div>
      </main>
    </div>
  );
}

export default App;
