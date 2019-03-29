import {
   FETCH_POST_COMMENTS, DISMISS_COMMENTS
} from '../actions/comments'

export function comments(state = {}, action) {
    switch (action.type) {
        case FETCH_POST_COMMENTS:
            return [...action.comments]
        case DISMISS_COMMENTS:
            return []
        default:
            return state
    }
}