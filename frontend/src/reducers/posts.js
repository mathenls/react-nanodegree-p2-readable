import {
    RECEIVE_POSTS
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

        default:
            return state
    }
}