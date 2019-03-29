import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Card, Icon, Tag } from 'antd'
import { Typography } from 'antd';

const { Title } = Typography

const PostCard = styled(Card)`
    background-color: #FEFEFE;
    margin: 24px;
    width: 50%;
`
const PostIcon = styled(Icon)`
    font-size: 18px;
    margin: 6px;
`
const VoteScore = styled.span`
    font-size: 18px;
    margin: 6px;
`
const BodyContainer = styled.div`
    min-height: 40px;
    text-align: left;
    font-size: 14px;
    vertical-align: baseline;
    margin: 12px 12px 12px 0px;
`

const Post = (props) => {
    const { post, handleUpvote, handleDownvote, isDetails } = props
    const { id, category, title, body, author, timestamp, commentCount, voteScore } = post

    return (
        <PostCard
            key={id}
        >
            <Tag color="blue">{category}</Tag>
            <Link to={`/${category}/${id}`}>
                <Title level={4}>{title}</Title>
            </Link>
            {isDetails && (
                <BodyContainer>{body}</BodyContainer>
            )}
            <span>
                <PostIcon type="like" theme="filled" onClick={() => handleUpvote(id)} />
                <VoteScore>{voteScore}</VoteScore>
                <PostIcon type="dislike" theme="filled" onClick={() => handleDownvote(id)}  />
                <PostIcon type="message" /> {commentCount}
            </span>
        </PostCard>
    )
}

export default Post