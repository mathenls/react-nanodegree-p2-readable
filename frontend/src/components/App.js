import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import PostsContainer from './PostsContainer'
import PostDetails from './PostDetails'
import NewPostForm from './NewPostForm'

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
                    <Route exact path='/' render={(props) => <PostsContainer {...props} />} />
                    <Route exact path='/new-post' render={(props) => <NewPostForm {...props} />} />
                    <Route exact path='/:category' render={(props) => <PostsContainer {...props} />} />
                    <Route exact path='/:category/:id' render={(props) => <PostDetails {...props} />} />
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