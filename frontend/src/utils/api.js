import * as data from './api_config.json'
const localServerAddress = data.localServerAddress
const endpoints = data.initialDataEndPoints
const headers = {
    'Authorization': data.authorizationToken,
    'Content-Type': 'application/json'
}


export async function getInitialData() {
    const promisesArray = endpoints.map(async (endpoint) => {
        return (await fetch(`${localServerAddress}/${endpoint}`,{
            headers: headers
        })).json()
    })

    return Promise.all(promisesArray)
        .then((responses) => {
            return {
                categories: responses[0].categories,
                posts: responses[1]
            }
        })
}

export async function getPost(id) {
    return (await fetch(`${localServerAddress}/posts/${id}`, {
        headers: headers
    })).json()
}

export async function saveVoteOnPost(id, option) {
    return (await fetch(`${localServerAddress}/posts/${id}`,{
        headers: headers,
        method: 'POST',
        body: JSON.stringify({id, option})
    })).json()
}

export async function getPostComments(parentId) {
    return (await fetch(`${localServerAddress}/posts/${parentId}/comments`, {
        headers: headers
    })).json()
}

export async function saveVoteOnComments(id, option) {
    return (await fetch(`${localServerAddress}/comments/${id}`,{
        headers: headers,
        method: 'POST',
        body: JSON.stringify({id, option})
    })).json()
}
