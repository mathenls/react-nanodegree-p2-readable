import {
   FETCH_POST_COMMENTS, DISMISS_COMMENTS, VOTE_ON_COMMENT, ADD_COMMENT, UNDO_ADD_COMMENT
} from '../actions/comments'

export function comments(state = {}, action) {
    switch (action.type) {
        case FETCH_POST_COMMENTS:
            return [...action.comments]
        case DISMISS_COMMENTS:
            return []
        case VOTE_ON_COMMENT:
            const commentIndex = state.findIndex(comment => comment.id === action.id)
            const voteScore = state[commentIndex].voteScore
            state[commentIndex].voteScore = action.option === 'upVote'
                ? voteScore + 1
                : voteScore - 1
            return [...state]
        case ADD_COMMENT:
            return [...state, {...action.comment, voteScore: 1, deleted: false, parentDeleted: false}]
        case UNDO_ADD_COMMENT:
            return state.filter(comment => comment.id !== action.id)
        default:
            return state
    }
}