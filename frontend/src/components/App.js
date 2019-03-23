import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import PostsContainer from './PostsContainer';
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
                  <PostsContainer />
                </React.Fragment>
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ loading, categories }) {
  return {
    loading: categories.length === 0
  }
}

export default connect(mapStateToProps)(App)