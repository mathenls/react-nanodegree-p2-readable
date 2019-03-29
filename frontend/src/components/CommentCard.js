import React from 'react'
import styled  from 'styled-components'
import { Comment, Tooltip, Avatar, Card, Icon } from 'antd'
import moment from 'moment'

const CommentContainer = styled(Card)`
    background-color: #FEFEFE;
    width: 100%;
    height: 150px;
    margin-top: 24px;
`

const CommentCard = (props) => {
    const { comment, handleUpVote, handleDownVote } = props
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