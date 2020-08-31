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
      <div class="columns">
        <div class="column">
          <a href="#" onClick={() => seePostDetail(post, { setComments, setPostDetail, setCompState })}>{ post.title }</a>
        </div>
      </div>
    </li>
  );

  return (
    <ol>
      {listItems}
    </ol>
  );
};

function renderComments(comments) {
  console.log(comments);
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

function PostList({ posts }) {
  const [lPosts,] = useState(posts);
  const [postDetail, setPostDetail] = useState({});
  const [comments, setComments] = useState([]);
  const [compState, setCompState] = useState(COMP_STATE.SHOWING_POST_LIST);

  if (compState === COMP_STATE.SHOWING_POST_LIST) {
    const listItems = postListItems(lPosts, { setComments, setPostDetail, setCompState });
    return listItems;
  }

  if (compState === COMP_STATE.SHOWING_POST_DETAIL) {
    const elPostDetail = renderPostDetail(postDetail);
    const elCommentList = renderComments(comments);
    return (
      <div className="my-6">
        { elPostDetail }
        { elCommentList }
      </div>
    );
  }

}

export default PostList;
