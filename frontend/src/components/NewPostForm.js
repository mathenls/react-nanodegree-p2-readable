import React from 'react'
import { Button, Input, Select } from 'antd'
import { connect } from 'react-redux'
import { Container, CenteredRow, FormCard, ErrorMessage } from '../components/generalComponents'
import generateId from 'uuid/v4'
import { handleAddPost } from  '../actions/posts'

const Option = Select.Option

class NewPostForm extends React.Component {
    state = {
        title: '',
        category: '',
        author: '',
        body: '',
        error: ''
    }

    handleCategoryChange = (value) => {
        this.setState({
            category: value
        })
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

    handleTitleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    handlePostSubmit = () => {
        const { title, author, body, category } = this.state
        if (!author || !body || !category || !title) {
            this.setState({
                error: 'Please, fill all fields.'
            })
        } else {
            const postBody = {
                id: generateId(),
                timestamp: Date.now(),
                title,
                category,
                author,
                body,
                voteScore: 1,
                commentCount: 0,
                deleted: false
            }
            this.props.dispatch(handleAddPost(postBody))
            this.props.history.push(`/${category}`)
        }
    }

    render() {
        const { categories } = this.props
        const { error } = this.state

        return (
            <Container>
                <FormCard>
                    <h2>New Post</h2>
                    <ErrorMessage>{error && `* ${error}`}</ErrorMessage>
                    <h4>Title</h4>
                    <CenteredRow>
                        <Input placeholder="Type post's title..." onChange={this.handleTitleChange} />
                    </CenteredRow>
                    <h4>Category</h4>
                    <CenteredRow>
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Select a category"
                            optionFilterProp="children"
                            onChange={this.handleCategoryChange}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {categories.listOfCategories.map((c) => (
                                <Option key={c.name} value={c.name}>{c.name}</Option>
                            ))}
                        </Select>
                    </CenteredRow>
                    <h4>Author</h4>
                    <CenteredRow>
                        <Input placeholder="Type author's username..." onChange={this.handleAuthorChange} />
                    </CenteredRow>
                    <h4>Content</h4>
                    <CenteredRow>
                        <Input.TextArea placeholder="Type post content..." onChange={this.handleBodyChange} />
                    </CenteredRow>
                    <CenteredRow>
                        <Button type="primary" icon="plus" onClick={this.handlePostSubmit}>Publish</Button>
                    </CenteredRow>
                </FormCard>
            </Container>

        )
    }

}

const mapStateToProps = ({categories}) => {
    return {
        categories
    }
}

export default connect(mapStateToProps)(NewPostForm)