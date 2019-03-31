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

const CommentCard = (props) => {
    const { comment, handleUpVote, handleDownVote, history } = props
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
            <Tooltip>
                <Icon
                    title='Edit Post'
                    type='edit'
                    theme='filled'
                    onClick={() => history.push(`/comments/${comment.id}/edit`)}
                />
                <TextLink to={`/comments/${comment.id}/edit`}>
                    Edit Post
                </TextLink>
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