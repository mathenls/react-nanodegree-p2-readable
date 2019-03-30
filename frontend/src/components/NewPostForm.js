import React from 'react'
import { Button, Input, Select, Card } from 'antd'
import { connect } from 'react-redux'
import { Container, CenteredRow } from '../components/generalComponents'
import styled from 'styled-components'
import generateId from 'uuid/v4'
import { handleAddPost } from  '../actions/posts'

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
                    <CenteredRow>
                        <Input placeholder="Type post's title..." onChange={this.handleTitleChange} />
                    </CenteredRow>
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
                    <CenteredRow>
                        <Input placeholder="Type author's username..." onChange={this.handleAuthorChange} />
                    </CenteredRow>
                    <CenteredRow>
                        <Input.TextArea placeholder="Type post content..." onChange={this.handleBodyChange} />
                    </CenteredRow>
                    <CenteredRow>
                        <Button type="primary" onClick={this.handlePostSubmit}>Submit</Button>
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