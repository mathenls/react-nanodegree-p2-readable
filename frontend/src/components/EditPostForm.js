import React from 'react'
import { Button, Input, Select, Card } from 'antd'
import { connect } from 'react-redux'
import { Container, CenteredRow } from '../components/generalComponents'
import styled from 'styled-components'
import { handleEditPost, fetchPost } from  '../actions/posts'

const Option = Select.Option

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

class EditPostForm extends React.Component {
    state = {
        title: '',
        body: '',
        error: ''
    }

    componentDidMount() {
        const { dispatch, match } = this.props
        dispatch(fetchPost(match.params.id))
    }

    componentWillReceiveProps() {
        if (this.props.post) {
            const { title, body } = this.props.post
            this.setState({
                title,
                body
            }, () => {
                this.forceUpdate()
            })
        }
    }

    handleBodyChange = (e) => {
        this.setState({
            body: e.target.value
        })
    }

    handleTitleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    handlePostEditSubmit = () => {
        const { post } = this.props
        const { title, body } = this.state
        if (!body || !title) {
            this.setState({
                error: 'Please, fill all fields.'
            })
        } else {
            const postContent = {
                body,
                title,
            }
            this.props.dispatch(handleEditPost(post.id, postContent, {title: post.title, body: post.body}))
            this.props.history.push(`/${post.category}/${post.id}`)
        }
    }

    render() {
        const { post, categories } = this.props
        const { error } = this.state

        return (
            'title' in post && (
                <Container>
                    <FormCard>
                        <h2>Edit Post</h2>
                        <ErrorMessage>{error && `* ${error}`}</ErrorMessage>
                        <h4>Title</h4>
                        <CenteredRow>
                            <Input defaultValue={post.title} placeholder="Type post's title..." onChange={this.handleTitleChange} />
                        </CenteredRow>
                        <h4>Category</h4>
                        <CenteredRow>
                            <Select
                                style={{ width: '100%' }}
                                disabled={true}
                                defaultValue={post.category}
                            >
                                {categories.listOfCategories.map((c) => (
                                    <Option key={c.name} value={c.name}>{c.name}</Option>
                                ))}
                            </Select>
                        </CenteredRow>
                        <h4>Author</h4>
                        <CenteredRow>
                            <Input disabled={true} placeholder="Type author's username..." defaultValue={post.author} />
                        </CenteredRow>
                        <h4>Content</h4>
                        <CenteredRow>
                            <Input.TextArea defaultValue={post.body} placeholder="Type post content..." onChange={this.handleBodyChange} />
                        </CenteredRow>
                        <CenteredRow>
                            <Button type="primary" icon="edit" onClick={this.handlePostEditSubmit}>Submit</Button>
                        </CenteredRow>
                    </FormCard>
                </Container>
            )
        )
    }
}

const mapStateToProps = ({ post, categories }) => {
    return {
        post,
        categories
    }
}

export default connect(mapStateToProps)(EditPostForm)