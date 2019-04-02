import React from 'react'
import { connect } from 'react-redux'
import { Button, Input } from 'antd'
import { Container, CenteredRow, FormCard, ErrorMessage } from './GeneralComponents'
import generateId from 'uuid/v4'
import { handleAddComment } from  '../actions/comments'

class AddCommentForm extends React.Component {
    state = {
        author: '',
        body: '',
        error: ''
    }

    handleAuthorChange = (e) => {
        this.setState({
            author: e.target.value
        })
    }

    handleBodyChange = (e) => {
        this.setState({
            body: e.target.value
        })
    }

    handleCommentSubmit = () => {
        const { author, body } = this.state
        const { post, addComment } = this.props

        if (!author || !body) {
            this.setState({
                error: 'Please, fill all fields.'
            })
        } else {
            const commentBody = {
                id: generateId(),
                timestamp: Date.now(),
                author,
                body,
                parentId: post.id
            }
            addComment(commentBody)
            this.clearFormState()
        }
    }

    clearFormState = () => {
        this.setState({
            author: '',
            body: '',
            error: ''
        })
    }

    render() {
        const { error, author, body } = this.state

        return (
            <Container>
                <FormCard>
                    <h2>Comment the post</h2>
                    <ErrorMessage>{error && `* ${error}`}</ErrorMessage>
                    <h4>Author</h4>
                    <CenteredRow>
                        <Input value={author} placeholder="Type author's username..." onChange={this.handleAuthorChange} />
                    </CenteredRow>
                    <h4>Comment</h4>
                    <CenteredRow>
                        <Input.TextArea value={body} placeholder="Type your comment..." onChange={this.handleBodyChange} />
                    </CenteredRow>
                    <CenteredRow>
                        <Button type="primary" icon="plus" onClick={this.handleCommentSubmit}>Publish Comment</Button>
                    </CenteredRow>
                </FormCard>
            </Container>
        )
    }
}

const mapStateToProps = ({post}) => {
    return {
        post
    }
}

const mapDispatchToProps = (dispatch) => ({
    addComment: (commentBody) => {
      dispatch(handleAddComment(commentBody))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCommentForm)