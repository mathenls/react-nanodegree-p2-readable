import React from 'react'
import { connect } from 'react-redux'
import { Card, Row, Col } from 'antd'
import styled from 'styled-components'

const Container = styled.div`
    padding: 24px;
    background-color: #FEFEFE;
`

const PostCard = styled(Card)`
    background-color: #FEFEFE;
    margin: 24px;
`

class PostsContainer extends React.Component {
  render()  {
      const { posts } = this.props
      const { listOfPosts } = posts

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
                            <h2>{post.category}</h2>
                            <p>{post.body}</p>
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

