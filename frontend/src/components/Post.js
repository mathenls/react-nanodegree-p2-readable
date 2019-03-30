import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Card, Icon, Tag, Typography, Tooltip, Button } from 'antd'
import moment from 'moment'

const { Title } = Typography

const PostCard = styled(Card)`
    background-color: #FEFEFE;
    margin: 24px;
    width: 50%;
    box-shadow: 0 0 10px 2px rgba(0,0,0,0.18) !important;
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
    const { post, handleUpvote, handleDownvote, handleDeletePost, isDetails } = props
    const { id, category, title, body, author, timestamp, commentCount, voteScore } = post

    return (
        <PostCard
            key={id}
        >
            <Tag color="blue">{category}</Tag>
            <Tooltip title={moment(timestamp).format('DD/MM/YYYY HH:mm:ss')}>
                <span>{moment(timestamp).fromNow()}</span> - <b>{author}</b>
            </Tooltip>
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
                {isDetails && (
                    <Button
                        type="danger"
                        style={{margin: '0 0 0 12px'}}
                        shape="circle"
                        icon="delete"
                        onClick={() => handleDeletePost(id)}
                    />
                )}
            </span>
        </PostCard>
    )
}

export default Post