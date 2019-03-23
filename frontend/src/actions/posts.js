import { saveVoteOnPost } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
export const VOTE_ON_POST = 'VOTE_ON_POST'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export function receivePosts (posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}

export function voteOnPost (id, option) {
  return {
    type: VOTE_ON_POST,
    id,
    option
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



