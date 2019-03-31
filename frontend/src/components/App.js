import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import Dashboard from './PostsContainer'
import PostDetails from './PostDetails'
import NewPostForm from './NewPostForm'
import EditPostForm from './EditPostForm'
import EditCommentForm from './EditCommentForm'
import NotFound from './404'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            {this.props.loading === true
              ? null
              : <React.Fragment>
                  <Nav />
                  <Switch>
                    <Route exact path='/' render={(props) => <Dashboard {...props} />} />
                    <Route exact path='/404' component={NotFound} />
                    <Route exact path='/new-post' render={(props) => <NewPostForm {...props} />} />
                    <Route exact path='/comments/:id/edit' render={(props) => <EditCommentForm {...props} />} />
                    <Route exact path='/:category' render={(props) => <Dashboard {...props} />} />
                    <Route exact path='/:category/:id' render={(props) => <PostDetails {...props} />} />
                    <Route exact path='/:category/:id/edit' render={(props) => <EditPostForm {...props} />} />
                  </Switch>
                </React.Fragment>
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ categories }) {
  return {
    loading: categories.length === 0
  }
}

export default connect(mapStateToProps)(App)