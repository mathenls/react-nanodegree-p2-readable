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
            />
        )}
    />
)

export default CommentList