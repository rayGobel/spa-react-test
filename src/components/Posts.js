import React, { useState, useEffect } from 'react';
import api from '../service/api';

const COMP_STATE = {
  SHOWING_POST_LIST: 'showingPostList',
  SHOWING_POST_DETAIL: 'showingPostDetail',
  SHOWING_NEW_POST_FORM: 'showingNewPostForm',
  SHOWING_EDIT_POST_FORM: 'showingEditPostForm',
  LOADING: 'loading',
};

const NOTIFICATION_STATE = {
  SHOW: 'showingNotification',
  HIDE: 'hidingNotification',
};

function PostForm({ post, context }) {
  const { submitNewPost, cancelNewPost } = context;

  const [lPost, setPost] = useState(post);

  function handleTitleChange(newTitle) {
    setPost({ ...lPost, ...{ title: newTitle } });
  };

  function handleBodyChange(newBody) {
    setPost({ ...lPost, ...{ body: newBody } });
  };

  return (
    <div>
      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Post Title"
            value={lPost.title}
            onChange={(ev) => handleTitleChange(ev.target.value)} />
        </div>
      </div>

      <div className="field">
        <label className="label">Post Body</label>
        <div className="control">
          <textarea className="textarea" placeholder="Post Body" value={lPost.body} onChange={(ev) => handleBodyChange(ev.target.value)}></textarea>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link" onClick={() => submitNewPost(lPost)}>Submit</button>
        </div>
        <div className="control">
          <button className="button is-link is-light" onClick={() => cancelNewPost()}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

function seePostDetail(post, { setPostDetail, setComments, setCompState }) {
  setPostDetail(post);

  return api.fetchPostComments(post.id)
    .then(comments => setComments(comments))
    .then(() => setCompState(COMP_STATE.SHOWING_POST_DETAIL));
};

function editPostDetail(post, { setPostDetail, setCompState }) {
  setPostDetail(post);
  setCompState(COMP_STATE.SHOWING_EDIT_POST_FORM);
};

function createNewPost({ setCompState }) {
  setCompState(COMP_STATE.SHOWING_NEW_POST_FORM);
};

function postListItems(posts, ctx) {
  const { setComments, setPostDetail, setCompState } = ctx;

  const listItems = posts.map(post =>
    <li key={post.id}>
      <div className="columns">
        <div className="column">
          <a href="#" onClick={() => seePostDetail(post, { setComments, setPostDetail, setCompState })}>{ post.title }</a>
        </div>
        <div className="column">
          <a href="#" onClick={() => editPostDetail(post, { setPostDetail, setCompState })}>edit</a>
        </div>
      </div>
    </li>
  );

  return (
    <div>
      <a href="#" onClick={() => createNewPost({ setCompState })}>Create New</a>
      <ol>
        {listItems}
      </ol>
    </div>
  );
};

function renderComments(comments) {
  const commentList = comments.map(comment =>
    <div className="box" key={comment.id}>
      <h4>
        From: { comment.name } ({ comment.email })
      </h4>
      <p>{ comment.body }</p>
    </div>
  );

  return (
    <div className="mt-6 pl-6">
      <h3>Comments</h3>

      { commentList }
    </div>
  )
};

function renderPostDetail(post) {
  return (
    <div>
      <h1>{ post.title }</h1>
      <p>{ post.body }</p>
    </div>
  );
};

function handleCreateNewPost(newPost, ctx) {
  const { setCompState, setNotifState } = ctx;
  setCompState(COMP_STATE.LOADING);
  return api.createNewPost(newPost)
    .then((createdPost) => setNotifState({ state: NOTIFICATION_STATE.SHOW, message: `Successfully created new post with ID: ${createdPost.id}` }))
    .then(() => setCompState(COMP_STATE.SHOWING_POST_LIST));
};

function handleUpdatePost(updatedPost, ctx) {
  console.log(updatedPost);
  const { setCompState, setNotifState } = ctx;
  setCompState(COMP_STATE.LOADING);
  return api.updatePost(updatedPost.id, updatedPost)
    .then((updatedPost) => setNotifState({ state: NOTIFICATION_STATE.SHOW, message: `Successfully updated post with ID: ${updatedPost.id}` }))
    .then(() => setCompState(COMP_STATE.SHOWING_POST_LIST));
};

function PostList({ user, posts }) {
  const [lPosts,] = useState(posts);
  const [postDetail, setPostDetail] = useState({});
  const [comments, setComments] = useState([]);
  const [compState, setCompState] = useState(COMP_STATE.SHOWING_POST_LIST);
  const [notifState, setNotifState] = useState({ state: NOTIFICATION_STATE.HIDE, message: ''});

  useEffect(() => {
    if (notifState.state === NOTIFICATION_STATE.SHOW) {
      setTimeout(function() {
        setNotifState({ state: NOTIFICATION_STATE.HIDE, message: '' });
      }, 1600);
    }
  }, [notifState]);

  let notification = '';

  if (notifState.state === NOTIFICATION_STATE.SHOW) {
    notification = (
      <div className="notification">{ notifState.message }</div>
    );
  }

  let content;

  if (compState === COMP_STATE.SHOWING_POST_LIST) {
    const listItems = postListItems(lPosts, { setComments, setPostDetail, setCompState });
    content = listItems;
  }

  if (compState === COMP_STATE.SHOWING_POST_DETAIL) {
    const elPostDetail = renderPostDetail(postDetail);
    const elCommentList = renderComments(comments);
    content = (
      <div className="my-6">
        { elPostDetail }
        { elCommentList }
      </div>
    );
  }

  if (compState === COMP_STATE.SHOWING_NEW_POST_FORM) {
    const newPost = {
      title: '',
      body: '',
    };

    content = (
      <PostForm
        post={newPost}
        context={
          {
            submitNewPost: (newPost) => handleCreateNewPost({ ...{ userId: user.id }, ...newPost }, { setCompState, setNotifState }),
            cancelNewPost: () => setCompState(COMP_STATE.SHOWING_POST_LIST)
          }
        }
      />);
  }

  if (compState === COMP_STATE.SHOWING_EDIT_POST_FORM) {
    content = (
      <PostForm
        post={postDetail}
        context={
          {
            submitNewPost: (updatedPost) => handleUpdatePost(updatedPost, { setCompState, setNotifState }),
            cancelNewPost: () => setCompState(COMP_STATE.SHOWING_POST_LIST)
          }
        }
      />);
  };

  if (compState === COMP_STATE.LOADING) {
    return (
      <div className="columns">
        <div className="column">
          <p className="is-size-4">
            LOADING...
          </p>
        </div>
      </div>
    );
  }

  return (<div>{ notification }{ content }</div>);
}

export default PostList;
