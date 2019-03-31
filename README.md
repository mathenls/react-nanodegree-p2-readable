# React Developer Nanodegree Project - Readable

This project is the second project in Udacity's React Developer Nanodegree program, in the second module 'React and Redux'.
The project is basically a content sharing and discussion forum similar to Reddit. A user can publish a post, comment in it, upvote, downvote, edit and delete them. Comments can be edited and deleted too. The posts are separated by categories returned by the API.
The application in integrated with a local API that saves it's state based on the Authorization token sent, and has some default hardcoded initial data.
In the front-end side, the application's state is controlled using Redux, and Redux Thunks to deal with async requests on the API. The actions and reducers are separated by context, like posts, categories and comments.
It uses Ant Design as the main UI library, complemented with some styled components.


## How to run

To run this project, clone the repository and follow these simple steps:

* Install and start the API server
    - `cd api-server`
    - `yarn install`
    - `node server`
* In another terminal window, to run the front-end application, run these commands:
    - `cd frontend`
    - `yarn install`
    - `yarn start`

## React

* react@16.8.5
* react-dom@16.8.5
* react-redux@6.0.1
* react-redux-loading@1.0.1
* react-router-dom@5.0.0

## External Libraries Used

* redux@4.0.1
* redux-thunk@2.3.0
* styled-components@4.1.3
* uuid@3.3.2
* antd@3.15.1
* lodash@4.17.11
* moment@2.24.0