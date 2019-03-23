import React from 'react'
import { connect } from 'react-redux'
import { Card, Row, Col, Icon } from 'antd'
import styled from 'styled-components'
import { handleVoteOnPost } from '../actions/posts';

const Container = styled.div`
    padding: 24px;
    background-color: #FEFEFE;
`

const PostCard = styled(Card)`
    background-color: #FEFEFE;
    margin: 24px;
`

const PostIcon = styled(Icon)`
    font-size: 16px;
    margin-left: 4px;
`

const CategoryHeader = styled.h2`
    font-weight: bold;
    display: inline;
`

class PostsContainer extends React.Component {
  handleUpvote = (id) => {
      this.props.dispatch(handleVoteOnPost(id, 'upVote'))
  }
  handleDownvote = (id) => {
    this.props.dispatch(handleVoteOnPost(id, 'downVote'))
  }

  render()  {
      const { handleDownvote, handleUpvote } = this
      const { posts, match } = this.props
      let { listOfPosts } = posts

      if (match.params.category) {
          listOfPosts = listOfPosts.filter(post => post.category === match.params.category)
      }

      return (
        <Container>
            {listOfPosts.map((post) => (
                <Row gutter={16}>
                    <Col span={8}>
                        <PostCard
                            title={post.title}
                            extra={post.author}
                            style={{ width: 400 }}
                            key={post.id}
                        >
                            <div>
                                <PostIcon type="folder" />
                                <CategoryHeader>{post.category}</CategoryHeader>
                            </div>
                            <span>
                                {post.voteScore}
                                <PostIcon type="like" theme="filled" onClick={() => handleUpvote(post.id)} />
                                <PostIcon type="dislike" theme="filled" onClick={() => handleDownvote(post.id)}  />
                            </span>
                            <span>
                                <PostIcon type="message" /> {post.commentCount}
                            </span>
                        </PostCard>
                    </Col>
                </Row>
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

