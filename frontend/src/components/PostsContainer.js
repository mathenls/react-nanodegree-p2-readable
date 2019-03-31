import React from 'react'
import { connect } from 'react-redux'
import { Radio, Button } from 'antd'
import { handleVoteOnPost, handlePostDeletion } from '../actions/posts'
import Post from './Post'
import { orderBy } from 'lodash'
import { Container, ActionsContainer, CenteredRow, CenteredCol, SpaceBetweenRow } from '../components/generalComponents'

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

