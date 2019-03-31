import React from 'react'
import { Button, Input, Card } from 'antd'
import { connect } from 'react-redux'
import { Container, CenteredRow } from './GeneralComponents'
import styled from 'styled-components'
import { handleFetchCommentById, handleEditComment, dismissComment } from '../actions/comments'
import { defer } from 'lodash'

const FormCard = styled(Card)`
    background-color: #FEFEFE;
    margin: 24px;
    width: 50%;
    box-shadow: 0 0 10px 2px rgba(0,0,0,0.18) !important;
`
const ErrorMessage = styled.h3`
    color: red;
    font-weight: bold;
`

class EditCommentForm extends React.Component {
    state = {
        author: '',
        body: '',
        error: ''
    }

    componentDidMount() {
        const { dispatch, match } = this.props
        dispatch(handleFetchCommentById(match.params.id))
    }

    componentWillUnmount() {
        this.props.dispatch(dismissComment())
    }

    componentWillReceiveProps() {
        defer(() => {
            if (this.props.comment) {
                const { body, author } = this.props.comment
                this.setState({
                    author,
                    body
                }, () => {
                    this.forceUpdate()
                })
            }
        })
    }

    handleBodyChange = (e) => {
        this.setState({
            body: e.target.value
        })
    }

    handleCommentEditSubmit = () => {
        const { comment } = this.props
        const { body } = this.state

        if (!body) {
            this.setState({
                error: 'Please, fill all fields.'
            })
        } else {
            const commentContent = {
                timestamp: Date.now(),
                body
            }
            this.props.dispatch(handleEditComment(comment.id, commentContent, { body: comment.body}))
            this.props.history.goBack()
        }
    }

    render() {
        const { comment } = this.props
        const { error } = this.state

        return (
            'body' in comment && (
                <Container>
                    <FormCard>
                        <h2>Edit Comment</h2>
                        <ErrorMessage>{error && `* ${error}`}</ErrorMessage>
                        <h4>Author</h4>
                        <CenteredRow>
                            <Input disabled={true} defaultValue={comment.author} placeholder="Type author's username..."  />
                        </CenteredRow>
                        <h4>Content</h4>
                        <CenteredRow>
                            <Input.TextArea defaultValue={comment.body} placeholder="Type post content..." onChange={this.handleBodyChange} />
                        </CenteredRow>
                        <CenteredRow>
                            <Button type="primary" icon="edit" onClick={this.handleCommentEditSubmit}>Save</Button>
                        </CenteredRow>
                    </FormCard>
                </Container>
            )
        )
    }
}

const mapStateToProps = ({ comment }) => {
    return {
        comment
    }
}

export default connect(mapStateToProps)(EditCommentForm)