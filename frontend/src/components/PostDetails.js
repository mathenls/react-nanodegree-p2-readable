import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import CommentList from './CommentList'
import { fetchPost, handleVoteOnPost } from '../actions/posts'
import { fetchPostComments, dismissComments } from '../actions/comments'
import Post from './Post'

const Container = styled.div`
    padding: 24px;
    background-color: #e9ebee;
    display: flex;
    align-items: center;
    flex-direction: column;
`

class PostDetails extends Component {
    
    componentDidMount() {
        const { dispatch, match } = this.props
        dispatch(fetchPost(match.params.id))
        dispatch(fetchPostComments(match.params.id))
    }

    componentWillUnmount() {
        this.props.dispatch(dismissComments())
    }

    handleUpvote = (id) => {
        this.props.dispatch(handleVoteOnPost(id, 'upVote'))
    }

    handleDownvote = (id) => {
      this.props.dispatch(handleVoteOnPost(id, 'downVote'))
    }

    render() {
        const { post, comments } = this.props

        return (
            <Container>
                <Post post={post} handleDownvote={this.handleDownvote} handleUpvote={this.handleUpvote} isDetails={true} />
                <h2><b>Comments</b> ({comments.length})</h2>
                {comments.length > 0 && 
                    <CommentList comments={comments} />
                }
            </Container>
        )
    }
}

function mapStateToProps ({ post, comments }) {
    return {
        post,
        comments
    }
}

export default connect(mapStateToProps)(PostDetails)
