import { combineReducers } from 'redux'
import categories from './categories'
import { posts, post }  from './posts'
import { comments }  from './comments'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
    categories,
    posts,
    post,
    comments,
    loadingBar: loadingBarReducer,
})