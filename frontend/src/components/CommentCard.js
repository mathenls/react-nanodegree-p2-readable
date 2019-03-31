import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Comment, Tooltip, Avatar, Card, Icon } from 'antd'
import moment from 'moment'

const CommentContainer = styled(Card)`
    background-color: #FEFEFE;
    width: 100%;
    height: 150px;
    margin-top: 24px;
    box-shadow: 0 0 6px 2px rgba(0,0,0,0.18) !important;
`
const TextLink = styled(Link)`
    padding: 0 0 0 8px;
    cursor: pointer;
    color: black;
`
const DeleteText = styled.span`
    padding: 0 0 0 8px;
    cursor: pointer;
    color: red;
`

const CommentCard = (props) => {
    const { comment, handleUpVote, handleDownVote, handleDeleteComment, history } = props
    const { id, author, body, timestamp, voteScore } = comment

    const actions = [
        <span>
          <Tooltip>
            <Icon
              type='like'
              theme='filled'
              onClick={() => handleUpVote(id)}
            />
          </Tooltip>
          <span style={{ paddingLeft: 8, cursor: 'auto' }}>
            {voteScore}
          </span>
        </span>,
        <span>
          <Tooltip>
            <Icon
              type='dislike'
              theme='filled'
              onClick={() => handleDownVote(id)}
            />
          </Tooltip>
        </span>,
        <span>
            <Tooltip onClick={() => history.push(`/comments/${comment.id}/edit`)}>
                <Icon
                    title='Edit Comment'
                    type='edit'
                    theme='filled'
                />
                <TextLink>
                    Edit Comment
                </TextLink>
            </Tooltip>
        </span>,
        <span>
            <Tooltip onClick={() => handleDeleteComment(comment.id)}>
                <Icon
                    title='Delete Comment'
                    type='delete'
                    theme='filled'
                />
                <DeleteText>
                    Delete Comment
                </DeleteText>
            </Tooltip>
        </span>
      ]


    return (
        <CommentContainer>
            <Comment
                actions={actions}
                author={<a href='#'>{author}</a>}
                avatar={(
                    <Avatar
                        src="https://openclipart.org/image/300px/svg_to_png/250354/icon_user_greyonwhite.png"
                        alt={author}
                    />
                )}
                content={(
                    <p>{body}</p>
                )}
                datetime={(
                    <Tooltip title={moment(timestamp).format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment(timestamp).fromNow()}</span>
                    </Tooltip>
                )}
            />
        </CommentContainer>

    );
}

export default CommentCard