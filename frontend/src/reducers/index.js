import { combineReducers } from 'redux'
import categories from './categories'
import posts from './posts'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
    categories,
    posts,
    loadingBar: loadingBarReducer,
})