import React from 'react'
import styled from 'styled-components'
import { List } from 'antd'
import CommentCard from './CommentCard'

const CommentListContainer = styled(List)`
    width: 50%;
`

const CommentList = (props) => (
    <CommentListContainer
        locale={{emptyText: 'No comments to show'}}
        itemLayout="horizontal"
        dataSource={props.comments.filter(comment => !comment.deleted)}
        renderItem={item => (
            <CommentCard
                comment={item}
                handleUpVote={props.handleUpVote}
                handleDownVote={props.handleDownVote}
                handleDeleteComment={props.handleDeleteComment}
                history={props.history}
            />
        )}
    />
)

export default CommentList