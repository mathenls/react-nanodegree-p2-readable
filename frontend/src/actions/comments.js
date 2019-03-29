import { getPostComments } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
export const FETCH_POST_COMMENTS = 'FETCH_POST_COMMENTS'
export const DISMISS_COMMENTS = 'DISMISS_COMMENTS'

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




