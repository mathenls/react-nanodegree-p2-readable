import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Radio } from 'antd'
import styled from 'styled-components'
import { handleVoteOnPost, handlePostDeletion } from '../actions/posts'
import Post from './Post'
import { orderBy } from 'lodash'

const Container = styled.div`
    padding: 24px;
    background-color: #e9ebee;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
`

const CenteredRow = styled(Row)`
    width: 100%;
`

const CenteredCol= styled(Col)`
    display: flex;
    justify-content: center;
`

class PostsContainer extends React.Component {

  state = {
      orderParam: 'timestamp'
  }

  handleUpvote = (id) => {
      this.props.dispatch(handleVoteOnPost(id, 'upVote'))
  }

  handleDownvote = (id) => {
    this.props.dispatch(handleVoteOnPost(id, 'downVote'))
  }

  handleDeletePost = (id) => {
    this.props.dispatch(handlePostDeletion(id))
  }

  handleOrderParamChange = (e) => {
      this.setState({
          orderParam: e.target.value
      })
  }

  render()  {
      const { match } = this.props
      let { posts } = this.props
      const { orderParam } = this.state

      if (match.params.category) {
          posts = posts.filter(post => post.category === match.params.category)
      }
      posts = orderBy(posts, [orderParam], ['desc']).filter(post => !post.deleted)

      return (
        <>
        <Container>
          {posts.length > 0 ? (
              <>
              <span>Order Posts By: </span>
              <Radio.Group value={orderParam} onChange={this.handleOrderParamChange}>
                <Radio.Button value="timestamp">Posted Date</Radio.Button>
                <Radio.Button value="voteScore">Vote Score</Radio.Button>
              </Radio.Group>
              {posts.map((post) => (
                  <CenteredRow gutter={24}>
                      <CenteredCol span={24}>
                          <Post 
                            post={post} 
                            handleDownvote={this.handleDownvote} 
                            handleUpvote={this.handleUpvote} 
                            handleDeletePost={this.handleDeletePost}
                          />
                      </CenteredCol>
                  </CenteredRow>
              ))}
            </>
          ) : (
            <h2>No posts {match.params.category && `about ${match.params.category} `} yet. :(</h2>
          )}
          </Container>
        </>
      )
    }
}
function mapStateToProps ({ posts }) {
    return {
        posts
    }
}

export default connect(mapStateToProps)(PostsContainer)

