import {
   FETCH_POST_COMMENTS,
   DISMISS_COMMENTS,
   VOTE_ON_COMMENT,
   ADD_COMMENT,
   UNDO_ADD_COMMENT,
   FETCH_COMMENT,
   EDIT_COMMENT,
   DISMISS_COMMENT,
   DELETE_COMMENT,
   UNDO_DELETE_COMMENT
} from '../actions/comments'

export function comments(state = {}, action) {
    let commentIndex
    if ('id' in action) {
        commentIndex = state.findIndex(comment => comment.id === action.id)
    }
    switch (action.type) {
        case FETCH_POST_COMMENTS:
            return [...action.comments]
        case DISMISS_COMMENTS:
            return []
        case VOTE_ON_COMMENT:
            const voteScore = state[commentIndex].voteScore
            state[commentIndex].voteScore = action.option === 'upVote'
                ? voteScore + 1
                : voteScore - 1
            return [...state]
        case ADD_COMMENT:
            return [...state, {...action.comment, voteScore: 1, deleted: false, parentDeleted: false}]
        case UNDO_ADD_COMMENT:
            return state.filter(comment => comment.id !== action.id)
        case DELETE_COMMENT:
            state[commentIndex].deleted = true
            return [...state]
        case UNDO_DELETE_COMMENT:
            state[commentIndex].deleted = false
            return [...state]
        default:
            return state
    }
}

export function comment(state = {}, action) {
    switch (action.type) {
        case FETCH_COMMENT:
            return { ...action.comment }
        case EDIT_COMMENT:
            return { ...state, ...action.commentContent}
        case DISMISS_COMMENT:
            return {}
        default:
            return state
    }
}