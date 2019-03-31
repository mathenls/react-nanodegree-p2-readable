import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import CommentList from './CommentList'
import { fetchPost, handleVoteOnPost, handlePostDeletion } from '../actions/posts'
import { dismissComments, handleVoteOnComment, handleFetchPostComments, handleDeleteComment } from '../actions/comments'
import Post from './Post'
import AddCommentForm from './AddCommentForm'
import { defer } from 'lodash'

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
        dispatch(handleFetchPostComments(match.params.id))
    }

    componentWillUnmount() {
        this.props.dispatch(dismissComments())
    }

    componentWillReceiveProps() {
        defer(() => {
            const { post } = this.props
            if (!('id' in post)) {
                this.props.history.push('/404')
            }
        })
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

    handleDeleteComment = (id) => {
        this.props.dispatch(handleDeleteComment(id))
    }

    render() {
        const { post, comments } = this.props

        return (
            'id' in post && (
                <Container>
                    <Post
                        post={post}
                        handleDownvote={this.handlePostDownVote}
                        handleUpvote={this.handlePostUpVote}
                        isDetails={true}
                        handleDeletePost={this.handleDeletePost}
                        history={this.props.history}
                    />
                    {comments.length > 0 ? (
                        <>
                            <h2><b>Comments</b> ({comments.filter(comment => !comment.deleted).length})</h2>
                            <CommentList
                                comments={comments.filter(comment => !comment.deleted)}
                                handleUpVote={this.handleCommentUpVote}
                                handleDownVote={this.handleCommentDownVote}
                                handleDeleteComment={this.handleDeleteComment}
                                history={this.props.history}
                            />
                        </>
                    ) : (
                        <h2>No comments yet! <b>Publish the first one!</b></h2>
                    )}
                    <AddCommentForm />
                </Container>
            )
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
