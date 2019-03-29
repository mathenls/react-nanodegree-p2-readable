import { saveVoteOnPost, getPost, deletePost } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
export const VOTE_ON_POST = 'VOTE_ON_POST'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const FETCH_POST = 'FETCH_POST'
export const DELETE_POST = 'DELETE_POST'
export const UNDO_DELETE_POST = 'UNDO_DELETE_POST'

export function receivePosts (posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}

function handleFetchPost(post) {
  return {
    type: FETCH_POST,
    post
  }
}

export function fetchPost (id) {
  return (dispatch) => {
    dispatch(showLoading())
    return getPost(id)
      .then((post) => {
        dispatch(hideLoading())
        dispatch(handleFetchPost(post))
      })
  }
}

export function voteOnPost (id, option) {
  return {
    type: VOTE_ON_POST,
    id,
    option
  }
}

export function deletePostById (id) {
  return {
    type: DELETE_POST,
    id
  }
}

export function undoDeletePost (id) {
  return {
    type: UNDO_DELETE_POST,
    id
  }
}

export function handleVoteOnPost (id, option) {
  return (dispatch) => {
    dispatch(showLoading())
    dispatch(voteOnPost(id, option))
    return saveVoteOnPost(id, option)
      .then(() => {
        dispatch(hideLoading())
      }).catch(() => {
        switch (option) {
          case 'upVote':
            dispatch(voteOnPost(id, 'downVote'))
            break
          case 'downvote':
            dispatch(voteOnPost(id, 'upVote'))
            break
          default:
            console.log('Error on votePost')
            break
        }
      })
  }
}

export function handlePostDeletion (id) {
  return (dispatch) => {
    dispatch(showLoading())
    dispatch(deletePostById(id))
    return deletePost(id)
      .then(() => {
        dispatch(hideLoading())
      }).catch(() => {
        dispatch(undoDeletePost(id))
      })
  }
}




