import React from 'react'
import styled from 'styled-components'
import { Card, Icon } from 'antd'

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

const Post = (props) => {
    const { post, handleUpvote, handleDownvote } = props
    return (
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
    )
}

export default Post