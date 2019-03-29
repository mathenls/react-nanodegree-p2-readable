import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import styled from 'styled-components'
import { handleVoteOnPost } from '../actions/posts'
import Post from './Post'

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
  handleUpvote = (id) => {
      this.props.dispatch(handleVoteOnPost(id, 'upVote'))
  }
  handleDownvote = (id) => {
    this.props.dispatch(handleVoteOnPost(id, 'downVote'))
  }

  render()  {
      const { posts, match } = this.props
      let { listOfPosts } = posts

      if (match.params.category) {
          listOfPosts = listOfPosts.filter(post => post.category === match.params.category)
      }

      return (
        <Container>
            {listOfPosts.map((post) => (
                <CenteredRow gutter={24}>
                    <CenteredCol span={24}>
                        <Post post={post} handleDownvote={this.handleDownvote} handleUpvote={this.handleUpvote} />
                    </CenteredCol>
                </CenteredRow>
            ))}
        </Container>
      )
    }
}
function mapStateToProps ({ posts }) {
    return {
        posts
    }
}

export default connect(mapStateToProps)(PostsContainer)

