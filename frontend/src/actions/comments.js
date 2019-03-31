import { getPostComments, saveVoteOnComments, addCommentToPost } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
export const FETCH_POST_COMMENTS = 'FETCH_POST_COMMENTS'
export const DISMISS_COMMENTS = 'DISMISS_COMMENTS'
export const VOTE_ON_COMMENT = 'VOTE_ON_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const UNDO_ADD_COMMENT = 'UNDO_ADD_COMMENT'

export function handleFetchPostComments (comments) {
  return {
    type: FETCH_POST_COMMENTS,
    comments
  }
}

export function dismissComments () {
    return {
        type: DISMISS_COMMENTS,
    }
}

export function fetchPostComments (parentId) {
  return (dispatch) => {
    dispatch(showLoading())
    return getPostComments(parentId)
      .then((comments) => {
        dispatch(hideLoading())
        dispatch(handleFetchPostComments(comments))
      })
  }
}

export function voteOnComment (id, option) {
  return {
    type: VOTE_ON_COMMENT,
    id,
    option
  }
}

export function handleVoteOnComment (id, option) {
  return (dispatch) => {
    dispatch(showLoading())
    dispatch(voteOnComment(id, option))
    return saveVoteOnComments(id, option)
      .then(() => {
        dispatch(hideLoading())
      }).catch(() => {
        switch (option) {
          case 'upVote':
            dispatch(voteOnComment(id, 'downVote'))
            break
          case 'downvote':
            dispatch(voteOnComment(id, 'upVote'))
            break
          default:
            console.log('Error on votePost')
            break
        }
        dispatch(hideLoading())
      })
  }
}

export function addComment (comment) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function undoAddComment (id) {
  return {
    type: UNDO_ADD_COMMENT,
    id
  }
}

export function handleAddComment (comment) {
  return (dispatch) => {
    dispatch(showLoading())
    dispatch(addComment(comment))
    return addCommentToPost(comment).then(() => {
      dispatch(hideLoading())
    }).catch(() => {
      dispatch(undoAddComment(comment.id))
      dispatch(hideLoading())
    })
  }
}





