import {
    RECEIVE_CATEGORIES
} from '../actions/categories'

const initialState = {
    listOfCategories: []
}

export default function categories(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_CATEGORIES:
            return {
                ...state,
                listOfCategories: state.listOfCategories.concat(action.categories)
            }

        default:
            return state
    }
}