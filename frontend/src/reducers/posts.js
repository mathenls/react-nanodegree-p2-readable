import {
    RECEIVE_POSTS, VOTE_ON_POST, FETCH_POST, DELETE_POST, UNDO_DELETE_POST, ADD_POST, UNDO_ADD_POST, EDIT_POST
} from '../actions/posts'

import { ADD_COMMENT, UNDO_ADD_COMMENT, DELETE_COMMENT, UNDO_DELETE_COMMENT } from '../actions/comments'


export function posts(state = [], action) {
    let postIndex = -1
    if (action.id) {
        postIndex = state.findIndex(post => post.id === action.id)
    }
    switch (action.type) {
        case RECEIVE_POSTS:
            return [...state, ...action.posts]
        case VOTE_ON_POST:
            const voteScore = state[postIndex].voteScore
            state[postIndex].voteScore = action.option === 'upVote'
                ? voteScore + 1
                : voteScore - 1
            return [
                ...state
            ]
        case DELETE_POST:
            state[postIndex].deleted = true
            return [...state]
        case UNDO_DELETE_POST:
            state[postIndex].deleted = false
            return [...state]
        case ADD_POST:
            return [...state, {...action.post}]
        case UNDO_ADD_POST:
            return state.filter(post => post.id !== action.id)
        default:
            return state
    }
}

export function post(state = {}, action) {
    switch (action.type) {
        case FETCH_POST:
            return {...action.post}
        case VOTE_ON_POST: {
            const post = {...state}
            return {
                ...post,
                voteScore: action.option === 'upVote' ? post.voteScore + 1 : post.voteScore - 1
            }
        }
        case EDIT_POST: {
            return {...state, ...action.postContent}
        }
        case ADD_COMMENT:
            return {...state, commentCount: state.commentCount + 1}
        case UNDO_ADD_COMMENT:
            return {...state, commentCount: state.commentCount - 1}
        case DELETE_COMMENT:
            return {...state, commentCount: state.commentCount - 1}
        case UNDO_DELETE_COMMENT:
            return {...state, commentCount: state.commentCount + 1}
        default:
            return state
    }
}