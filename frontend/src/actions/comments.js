import { getPostComments, saveVoteOnComments, addCommentToPost, fetchComment, editComment, deleteComment } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const FETCH_POST_COMMENTS = 'FETCH_POST_COMMENTS'
export const DISMISS_COMMENTS = 'DISMISS_COMMENTS'
export const DISMISS_COMMENT = 'DISMISS_COMMENT'
export const VOTE_ON_COMMENT = 'VOTE_ON_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const UNDO_ADD_COMMENT = 'UNDO_ADD_COMMENT'
export const FETCH_COMMENT = 'FETCH_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UNDO_DELETE_COMMENT = 'UNDO_DELETE_COMMENT'

export function fetchPostComments (comments) {
  return {
    type: FETCH_POST_COMMENTS,
    comments
  }
}

export function fetchCommentContent (comment) {
  return {
    type: FETCH_COMMENT,
    comment
  }
}

export function handleFetchCommentById (id) {
  return (dispatch) => {
    dispatch(showLoading())
    return fetchComment(id)
      .then((result) => {
      dispatch(fetchCommentContent(result))
      dispatch(hideLoading())
    }).catch((e) => {
      console.log(e)
    })
  }
}

export function dismissComments () {
    return {
        type: DISMISS_COMMENTS
    }
}

export function dismissComment () {
  return {
      type: DISMISS_COMMENT
  }
}

export function handleFetchPostComments (parentId) {
  return (dispatch) => {
    dispatch(showLoading())
    return getPostComments(parentId)
      .then((comments) => {
        dispatch(hideLoading())
        dispatch(fetchPostComments(comments))
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

export function editCommentById (id, commentContent) {
  return {
    type: EDIT_COMMENT,
    id,
    commentContent
  }
}

export function handleEditComment (id, commentContent, previousCommentContent) {
  return (dispatch) => {
    dispatch(showLoading())
    dispatch(editCommentById(id, commentContent))
    return editComment(id, commentContent)
      .then(() => {
        dispatch(hideLoading())
      }).catch(() => {
        dispatch(editCommentById(id, previousCommentContent))
        dispatch(hideLoading())
      })
  }
}

export function deleteCommentById (id) {
  return {
    type: DELETE_COMMENT,
    id
  }
}

export function undoDeleteComment (id) {
  return {
    type: UNDO_DELETE_COMMENT,
    id
  }
}

export function handleDeleteComment (id) {
  return (dispatch) => {
    dispatch(showLoading())
    dispatch(deleteCommentById(id))
    return deleteComment(id)
      .then(() => {
        dispatch(hideLoading())
      }).catch(() => {
        dispatch(undoDeleteComment(id))
        dispatch(hideLoading())
      })
  }
}







