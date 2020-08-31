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

function fetchPostComments(postId) {
  if (!postId) {
    const ErrNoPostId = new Error('No Post ID specified for request: fetchPostComments');
    return Promise.reject(ErrNoPostId);
  }

  const url = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;
  return fetch(url)
    .then(res => res.json());
};

function createNewPost(jsonFormData) {
  return fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(jsonFormData),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
};

function updatePost(postId, jsonFormData) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify(jsonFormData),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
};

const api = {
  fetchUsers,
  fetchUserPosts,
  fetchUserAlbum,
  fetchAlbumDetail,
  fetchPostComments,
  createNewPost,
  updatePost,
};

export default api;
