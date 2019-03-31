import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import CommentList from './CommentList'
import { fetchPost, handleVoteOnPost, handlePostDeletion } from '../actions/posts'
import { fetchPostComments, dismissComments, handleVoteOnComment } from '../actions/comments'
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

    handlePostUpVote = (id) => {
        this.props.dispatch(handleVoteOnPost(id, 'upVote'))
    }

    handlePostDownVote = (id) => {
      this.props.dispatch(handleVoteOnPost(id, 'downVote'))
    }

    handleCommentUpVote = (id) => {
        this.props.dispatch(handleVoteOnComment(id, 'upVote'))
    }

    handleCommentDownVote = (id) => {
      this.props.dispatch(handleVoteOnComment(id, 'downVote'))
    }

    handleDeletePost = (id) => {
        this.props.dispatch(handlePostDeletion(id))
        this.props.history.push(`/${this.props.match.params.category}`)
    }

    render() {
        const { post, comments } = this.props

        return (
            <Container>
                <Post
                    post={post}
                    handleDownvote={this.handlePostDownVote}
                    handleUpvote={this.handlePostUpVote}
                    isDetails={true}
                    handleDeletePost={this.handleDeletePost}
                    history={this.props.history}
                />
                <h2><b>Comments</b> ({comments.length})</h2>
                {comments.length > 0 &&
                    <CommentList
                        comments={comments}
                        handleUpVote={this.handleCommentUpVote}
                        handleDownVote={this.handleCommentDownVote}
                    />
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
