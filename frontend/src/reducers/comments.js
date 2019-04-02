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

export function comments(state = [], action) {
    switch (action.type) {
        case FETCH_POST_COMMENTS:
            return [...action.comments]
        case DISMISS_COMMENTS:
            return []
        case VOTE_ON_COMMENT:
            return state.map(comment => {
                const { id, voteScore } = comment
                if (id === action.id) {
                    return {
                        ...comment,
                        voteScore: action.option === 'upVote'
                            ? voteScore + 1
                            : voteScore - 1
                    }
                }
                return comment
            })
        case ADD_COMMENT:
            return [...state, {...action.comment, voteScore: 1, deleted: false, parentDeleted: false}]
        case UNDO_ADD_COMMENT:
            return state.filter(comment => comment.id !== action.id)
        case DELETE_COMMENT:
            return state.map(comment => {
                if (comment.id === action.id) {
                    return {
                        ...comment,
                        deleted: true
                    }
                }
                return comment
            })
        case UNDO_DELETE_COMMENT:
            return state.map(comment => {
                if (comment.id === action.id) {
                    return {
                        ...comment,
                        deleted: false
                    }
                }
                return comment
            })
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