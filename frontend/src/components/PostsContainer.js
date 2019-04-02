import React from 'react'
import { connect } from 'react-redux'
import { Radio, Button } from 'antd'
import { handleVoteOnPost, handlePostDeletion } from '../actions/posts'
import Post from './Post'
import { orderBy } from 'lodash'
import { Container, ActionsContainer, CenteredRow, CenteredCol, SpaceBetweenRow } from './GeneralComponents'

class PostsContainer extends React.Component {

  state = {
      orderParam: 'timestamp'
  }

  handleUpvote = (id) => {
    this.props.voteOnPost(id, 'upVote')
  }

  handleDownvote = (id) => {
    this.props.voteOnPost(id, 'downVote')
  }

  handleDeletePost = (id) => {
    this.props.deletePostById(id)
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
            <ActionsContainer>
                <SpaceBetweenRow>
                        <span>Order Posts By: </span>
                        <Radio.Group value={orderParam} onChange={this.handleOrderParamChange}>
                            <Radio.Button value="timestamp">Posted Date</Radio.Button>
                            <Radio.Button value="voteScore">Vote Score</Radio.Button>
                        </Radio.Group>
                </SpaceBetweenRow>
                <Button onClick={() => this.props.history.push('/new-post')} style={{margin: '12px'}} icon="plus">New Post</Button>
            </ActionsContainer>
              {posts.map((post) => (
                  <CenteredRow key={post.id} gutter={24}>
                      <CenteredCol span={24}>
                          <Post
                            post={post}
                            handleDownvote={this.handleDownvote}
                            handleUpvote={this.handleUpvote}
                            handleDeletePost={this.handleDeletePost}
                            history={this.props.history}
                          />
                      </CenteredCol>
                  </CenteredRow>
              ))}
            </>
          ) : (
            <>
                <Button onClick={() => this.props.history.push('/new-post')} style={{margin: '12px'}} icon="plus">New Post</Button>
                <h2>No posts {match.params.category && `about ${match.params.category} `} yet. Publish the first one!</h2>
            </>
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

const mapDispatchToProps = (dispatch) => ({
    voteOnPost: (id, option) => {
        dispatch(handleVoteOnPost(id, option))
    },
    deletePostById: (id) => {
        dispatch(handlePostDeletion(id))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer)

