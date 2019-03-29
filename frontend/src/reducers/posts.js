import {
    RECEIVE_POSTS, VOTE_ON_POST, FETCH_POST
} from '../actions/posts'

const initialState = {
    listOfPosts: []
}

export function posts(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_POSTS:
            return {
                ...state,
                listOfPosts: action.posts
            }
        case VOTE_ON_POST:
            const postIndex = state.listOfPosts.findIndex(post => post.id === action.id)
            const voteScore = state.listOfPosts[postIndex].voteScore
            state.listOfPosts[postIndex].voteScore = action.option === 'upVote'
                ? voteScore + 1
                : voteScore - 1
            return {
                ...state
            }

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
        default:
            return state
    }
}