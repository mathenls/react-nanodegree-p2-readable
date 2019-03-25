import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Card, Icon, Tag } from 'antd'
import { Typography } from 'antd';

const { Title } = Typography

const PostCard = styled(Card)`
    background-color: #FEFEFE;
    margin: 24px;
    width: 100%;
    transform: translate(25%, 25%);

`
const PostIcon = styled(Icon)`
    font-size: 16px;
    margin-left: 4px;
`

class PostDetails extends Component {
    render() {
        const { posts, match } = this.props
        const { listOfPosts } = posts
        const post = listOfPosts.find(p => p.id === match.params.id)

        return (
            <PostCard
                key={post.id}
            >
                <Link to={`/${post.category}/${post.id}`}>
                    <Tag color="blue">{post.category}</Tag>
                    <Title level={4}>{post.title}</Title>
                </Link>
                <div>
                    {post.body}
                </div>
                <span>
                    <PostIcon type="message" /> {post.commentCount}
                </span>
            </PostCard>
        )
    }
}

function mapStateToProps ({ posts }) {
    return {
        posts
    }
}

export default connect(mapStateToProps)(PostDetails)
