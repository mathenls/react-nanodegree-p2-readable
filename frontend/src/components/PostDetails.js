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
        const { match, fetchPostContent, fetchPostComments } = this.props
        const id = match.params.id

        fetchPostContent(id)
        fetchPostComments(id)
    }

    componentWillUnmount() {
        this.props.dismissAllComments()
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
        this.props.voteOnPost(id, 'upVote')
    }

    handlePostDownVote = (id) => {
        this.props.voteOnPost(id, 'downVote')
    }

    handleCommentUpVote = (id) => {
        this.props.voteOnComment(id, 'upVote')
    }

    handleCommentDownVote = (id) => {
        this.props.voteOnComment(id, 'downVote')
    }

    handleDeletePost = (id) => {
        const { deletePostById, history, match } = this.props
        deletePostById(id)
        history.push(`/${match.params.category}`)
    }

    handleDeleteComment = (id) => {
        this.props.deleteCommentById(id)
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

const mapDispatchToProps = (dispatch) => ({
    fetchPostContent: (id) => {
        dispatch(fetchPost(id))
    },
    fetchPostComments: (id) => {
        dispatch(handleFetchPostComments(id))
    },
    voteOnPost: (id, option) => {
        dispatch(handleVoteOnPost(id, option))
    },
    dismissAllComments: () => {
        dispatch(dismissComments())
    },
    voteOnComment: (id, option) => {
        dispatch(handleVoteOnComment(id, option))
    },
    deletePostById: (id) => {
        dispatch(handlePostDeletion(id))
    },
    deleteCommentById: (id) => {
        dispatch(handleDeleteComment(id))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)
