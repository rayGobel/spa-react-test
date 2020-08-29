import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';

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
  if (userId) {
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

function handle(ev) {
  console.log('clicked: ', ev);
};

function PostButton({ user, handlePostClick }) {
  return (
    <a href="#" onClick={(ev) => { ev.preventDefault(); handlePostClick(user); }} >Posts</a>
  );
};

function UserList({ users }) {
  const listItems = users.map(user =>
    <li key={user.id}>
    { user.id } - { user.name } <PostButton user={user} handlePostClick={handle} />
    </li>
  );
  return (
    <ul>{ listItems }</ul>
  );
}

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    updateUsers({ setUsers });
  }, []);

  return (
    <div className="App">
      <main>
        <div className="columns">
          <div className="column">
            { users.length ? <UserList users={users} /> : 'No Users' }
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
