import React, { useState, useEffect } from 'react';
import api from '../service/api';

const COMP_STATE = {
  SHOWING_POST_LIST: 'showingPostList',
  SHOWING_POST_DETAIL: 'showingPostDetail',
};

function seePostDetail(post, { setPostDetail, setComments, setCompState }) {
  setPostDetail(post);

  return api.fetchPostComments(post.id)
    .then(comments => setComments(comments))
    .then(() => setCompState(COMP_STATE.SHOWING_POST_DETAIL));
};

function postListItems(posts, ctx) {
  const { setComments, setPostDetail, setCompState } = ctx;

  const listItems = posts.map(post =>
    <li key={post.id}>
      <h1>
        { post.id } - { post.title } | <a href="#" onClick={() => seePostDetail(post, { setComments, setPostDetail, setCompState })}>view</a>
      </h1>
    </li>
  );

  return listItems;
};

function renderComments(comments) {
  const commentList = comments.map(comment =>
    <li key={comment.id}>
      <h2>
        From: { comment.name } ({ comment.email })
      </h2>
      <p>{ comment.body }</p>
    </li>
  );

  return (<ul>{ commentList }</ul>);
};

function renderPostDetail(post) {
  return (
    <div>
      <h1>{ post.title }</h1>
      <p>{ post.body }</p>
    </div>
  );
};

function PostList({ posts }) {
  const [lPosts,] = useState(posts);
  const [postDetail, setPostDetail] = useState({});
  const [comments, setComments] = useState([]);
  const [compState, setCompState] = useState(COMP_STATE.SHOWING_POST_LIST);

  if (compState === COMP_STATE.SHOWING_POST_LIST) {
    const listItems = postListItems(lPosts, { setComments, setPostDetail, setCompState });
    return (<ul>{ listItems }</ul>);
  }

  if (compState === COMP_STATE.SHOWING_POST_DETAIL) {
    const elPostDetail = renderPostDetail(postDetail);
    const elCommentList = renderComments(comments);
    return (<div>{ elPostDetail } { elCommentList }</div>);
  }

}

export default PostList;
