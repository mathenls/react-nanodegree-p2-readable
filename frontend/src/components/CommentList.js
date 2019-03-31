import React from 'react'
import styled from 'styled-components'
import { List } from 'antd'
import CommentCard from './CommentCard'

const CommentListContainer = styled(List)`
    width: 50%;
`

const CommentList = (props) => (
    <CommentListContainer
        itemLayout="horizontal"
        dataSource={props.comments}
        renderItem={item => (
            <CommentCard
                comment={item}
                handleUpVote={props.handleUpVote}
                handleDownVote={props.handleDownVote}
                history={props.history}
            />
        )}
    />
)

export default CommentList