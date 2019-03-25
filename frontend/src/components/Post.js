import React from 'react'
import { Link } from 'react-router-dom'
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

const Post = (props) => {
    const { post, handleUpvote, handleDownvote } = props


    return (
        <PostCard
            key={post.id}
        >
            <Tag color="blue">{post.category}</Tag>
            <Link to={`/${post.category}/${post.id}`}>
                <Title level={4}>{post.title}</Title>
            </Link>
            <span>
                {post.voteScore}
                <PostIcon type="like" theme="filled" onClick={() => handleUpvote(post.id)} />
                <PostIcon type="dislike" theme="filled" onClick={() => handleDownvote(post.id)}  />
            </span>
            <span>
                <PostIcon type="message" /> {post.commentCount}
            </span>
        </PostCard>
    )
}

export default Post