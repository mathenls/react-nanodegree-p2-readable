import {
    RECEIVE_POSTS, VOTE_ON_POST
} from '../actions/posts'

const initialState = {
    listOfPosts: []
}

export default function posts(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_POSTS:
            return {
                ...state,
                listOfPosts: action.posts
            }
        case VOTE_ON_POST:
            const postIndex = state.listOfPosts.findIndex(post => post.id === action.id)
            const voteScore = state.listOfPosts[postIndex].voteScore
            state.listOfPosts[postIndex].voteScore = action.option === 'upVote' ? voteScore + 1 : voteScore - 1
            return {
                ...state
            }

        default:
            return state
    }
}